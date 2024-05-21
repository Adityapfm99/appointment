// appointments/schemas/appointment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ default: 1 })
  availableSlots: number;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
