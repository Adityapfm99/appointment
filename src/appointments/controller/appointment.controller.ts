// appointments/appointments.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { AppointmentsService } from '../services/appointment.services';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('available-slots')
  getAvailableSlots(@Query('date') date: string) {
    return this.appointmentsService.getAvailableSlots(date);
  }

  @Post('book')
  bookAppointment(@Body() body: { date: string, time: string }) {
    return this.appointmentsService.bookAppointment(body.date, body.time);
  }

  @Delete('cancel/:id')
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentsService.cancelAppointment(id);
  }
}
