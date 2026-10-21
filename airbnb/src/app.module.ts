import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // اسم المستخدم لقاعدة بياناتك
      password: '952006', // كلمة سر PostgreSQL الخاصة بكِ
      database: 'postgres',
      entities: [User],
      synchronize: true, // سينشئ جدول users تلقائياً في PostgreSQL
    }),
    AuthModule,
    ListingsModule,
    BookingsModule,
  ],
})
export class AppModule {}