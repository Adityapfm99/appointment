// configs/schemas/config.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Config extends Document {
  @Prop({ default: 30 })
  slotDuration: number;

  @Prop({ default: 1 })
  maxSlotsPerAppointment: number;

  @Prop({ type: [String], default: ['09:00-18:00'] })
  operationalHours: string[];

  @Prop({ type: [String], default: [] })
  daysOff: string[];

  @Prop({ type: [String], default: [] })
  unavailableHours: string[];
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
