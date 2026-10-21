import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Listing } from '../listings/listing.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  // 1️⃣ إنشاء حجز جديد
  async createBooking(
    listingId: string,
    user: User,
    startDateStr: string,
    endDateStr: string,
  ): Promise<Booking> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (start >= end) {
      throw new BadRequestException('End date must be after start date');
    }

    // حساب عدد الليالي والإجمالي
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const totalPrice = nights * listing.pricePerNight;

    const booking = this.bookingRepository.create({
      startDate: start,
      endDate: end,
      totalPrice,
      user,
      listing,
    });

    return await this.bookingRepository.save(booking);
  }

  // 2️⃣ جلب حجوزات مستخدم معين
  async getUserBookings(userId: string): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: {
        listing: true,
      },
    });
  }
}