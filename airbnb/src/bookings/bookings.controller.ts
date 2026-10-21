import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // 🔒 مسار محمي: يتطلب Token للمستأجر
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: { listingId: string; startDate: string; endDate: string },
    @Request() req: any,
  ) {
    return this.bookingsService.createBooking(
      body.listingId,
      req.user,
      body.startDate,
      body.endDate,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-bookings')
  getUserBookings(@Request() req: any) {
    return this.bookingsService.getUserBookings(req.user.id);
  }
}