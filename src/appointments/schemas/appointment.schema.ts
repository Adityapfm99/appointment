import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true, default: uuidv4 }) // Generate UUID v4 by default
  appointmentId: string;

  @Prop({ required: true })
  availableSlots: number;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
