import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 1️⃣ إنشاء حساب جديد
  async register(dto: { email: string; password: string; firstName?: string; lastName?: string }) {
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName || 'User',
      lastName: dto.lastName || '',
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user.id, user.email);
    return { message: 'User registered successfully', token, user: { id: user.id, email: user.email } };
  }

  // 2️⃣ تسجيل الدخول
  async login(dto: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);
    return { message: 'Logged in successfully', token, user: { id: user.id, email: user.email } };
  }

  // إنشاء JWT Token
  private generateToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email });
  }
}