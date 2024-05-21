import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/module/appointment.module';
import { ConfigsModule } from './config/module/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AppointmentsModule,
    ConfigsModule,
  ],
})
export class AppModule {}
