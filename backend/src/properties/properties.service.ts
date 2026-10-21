import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(newProperty);
  }

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async remove(id: number) {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
  }
}