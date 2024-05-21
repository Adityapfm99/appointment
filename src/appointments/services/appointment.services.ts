// appointments/appointments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';
import { Config } from '../../config/schemas/config.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(Config.name) private configModel: Model<Config>,
  ) {}

  async getAvailableSlots(date: string): Promise<any[]> {
    const config = await this.configModel.findOne();
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
          availableSlots: available ? config.maxSlotsPerAppointment : 0,
        });
      }
    }
    return slots;
  }

  async bookAppointment(date: string, time: string): Promise<Appointment> {
    const config = await this.configModel.findOne();
    const existingAppointment = await this.appointmentModel.findOne({ date, time });

    if (existingAppointment && existingAppointment.availableSlots > 0) {
      existingAppointment.availableSlots -= 1;
      return existingAppointment.save();
    } else if (!existingAppointment) {
      const newAppointment = new this.appointmentModel({ date, time, availableSlots: config.maxSlotsPerAppointment - 1 });
      return newAppointment.save();
    } else {
      throw new NotFoundException('Slot not available');
    }
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.availableSlots += 1;
    if (appointment.availableSlots > 0) {
      return appointment.save();
    } else {
      return this.appointmentModel.findByIdAndDelete(id);
    }
  }
}
