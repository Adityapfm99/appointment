// config/config.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 30 })
  slotDuration: number;

  @Column({ default: 1 })
  maxSlotsPerAppointment: number;

  @Column('simple-array')
  operationalHours: string[];

  @Column('simple-array')
  daysOff: string[];
}


