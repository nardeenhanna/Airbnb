import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  // 1️⃣ جلب كل العقارات
  async findAll(): Promise<Listing[]> {
    return await this.listingRepository.find({
      relations: {
        host: true,
      },
    });
  }

  // 2️⃣ جلب عقار واحد برقمه المعرف (ID)
  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: {
        host: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  // 3️⃣ إضافة عقار جديد
  async create(dto: Partial<Listing>, hostUser: User): Promise<Listing> {
    const listing = this.listingRepository.create({
      ...dto,
      host: hostUser,
    });
    return await this.listingRepository.save(listing);
  }
}