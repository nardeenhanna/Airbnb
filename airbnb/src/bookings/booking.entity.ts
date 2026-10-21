import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Listing } from '../listings/listing.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column('decimal')
  totalPrice!: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  // المستخدم الذي قام بالحجز
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  // العقار المحجوز
  @ManyToOne(() => Listing, { onDelete: 'CASCADE' })
  listing!: Listing;

  @CreateDateColumn()
  createdAt!: Date;
}