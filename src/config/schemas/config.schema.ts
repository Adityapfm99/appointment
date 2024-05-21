import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Config {
  @Prop({ required: true })
  slotDuration: number;

  @Prop({ required: true })
  maxSlotsPerAppointment: number;

  @Prop({ required: true, type: Object })
  operationalHours: {
    start: number;
    end: number;
  };
}

export type ConfigDocument = Config & Document;
export const ConfigSchema = SchemaFactory.createForClass(Config);
