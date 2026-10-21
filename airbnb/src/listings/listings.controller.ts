import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { Listing } from './listing.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  getAllListings() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  getListingById(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  // 🔒 مسار محمي: يتطلب Token للمضيف
  @UseGuards(JwtAuthGuard)
  @Post()
  createListing(@Body() body: Partial<Listing>, @Request() req: any) {
    return this.listingsService.create(body, req.user);
  }
}