// appointments.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from '../services/appointment.services';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: 'Get available slots' })
  @Get('available-slots')
  @ApiResponse({
    status: 200,
    description: 'List of available slots returned successfully',
  })
  getAvailableSlots(@Query('date') date: string) {
    return this.appointmentsService.getAvailableSlots(date);
  }

  @ApiOperation({ summary: 'Book an appointment' })
  @Post('book')
  @ApiResponse({ status: 200, description: 'Appointment booked successfully' })
  bookAppointment(@Body() body: { date: string; time: string }) {
    return this.appointmentsService.bookAppointment(body.date, body.time);
  }

  @ApiOperation({ summary: 'Cancel an appointment by Appointment ID' })
  @Delete('cancel/:appointmentId')
  @ApiResponse({
    status: 200,
    description: 'Appointment canceled successfully',
  })
  cancelAppointment(@Param('appointmentId') appointmentId: string) {
    return this.appointmentsService.cancelAppointment(appointmentId);
  }
}
