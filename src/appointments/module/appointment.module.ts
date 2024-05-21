// appointments/appointments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsService } from '../services/appointment.services';
import { AppointmentsController } from '../controller/appointment.controller';
import { Appointment, AppointmentSchema } from '../schemas/appointment.schema';
import { ConfigsModule } from '../../config/module/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    ConfigsModule,
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
