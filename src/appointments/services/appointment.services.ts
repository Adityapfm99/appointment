import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from '../schemas/appointment.schema';
import { Config, ConfigDocument } from '../../config/schemas/config.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>,
  ) {}

  async getAvailableSlots(date: string): Promise<any[]> {
    const config = await this.configModel.findOne();
    if (!config) {
      throw new NotFoundException('Configuration not found');// this one no need because have seeding data
    }

    const appointments = await this.appointmentModel.find({ date });

    const slots = [];
    const startTime = 9;
    const endTime = 18;
    const slotDuration = config.slotDuration;

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minutes = 0; minutes < 60; minutes += slotDuration) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const available = !appointments.some(appointment => appointment.time === time);
        slots.push({
          date,
          time,
          appointmentId: uuidv4(),
          availableSlots: available ? config.maxSlotsPerAppointment : 0,
        });
      }
    }
    return slots;
  }

  async bookAppointment(date: string, time: string): Promise<any> {
    const config = await this.configModel.findOne();
    if (!config) {
        throw new NotFoundException('Configuration not found');
    }

    // Check if there's already an appointment for the given date and time
    const existingAppointment = await this.appointmentModel.findOne({ date, time });
    if (existingAppointment) {
        throw new ConflictException('Slot already booked');
    }

    const appointment = new this.appointmentModel({
        date,
        time,
        appointmentId: uuidv4(),
        availableSlots: config.maxSlotsPerAppointment - 1,
    });

    const savedAppointment = await appointment.save();

    return {
        status: 'ok',
        message: 'appointment created',
        data: savedAppointment.toObject(),
    };
}

  async cancelAppointment(appointmentId: string): Promise<any> {
    const appointment = await this.appointmentModel.findOne({ appointmentId });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.availableSlots += 1;
    let cancelledAppointment;
    if (appointment.availableSlots > 0) {
      cancelledAppointment = await appointment.save();
    } else {
      cancelledAppointment = await this.appointmentModel.findByIdAndDelete(appointment._id).exec();
    }
    return {
      status: 'ok',
      message: 'appointment cancelled',
      data: cancelledAppointment.toObject(), // Convert to plain object
    };
  }
}