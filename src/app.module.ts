// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/module/appointment.module';
import { ConfigsModule } from './config/module/config.module';
import { SeedService } from '../seed.services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      connectionFactory: (connection) => {
        connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });
        connection.on('connected', () => {
          console.log('Connected to MongoDB');
        });
        return connection;
      },
    }),
    AppointmentsModule,
    ConfigsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
