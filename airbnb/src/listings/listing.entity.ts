import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  location!: string;

  @Column('decimal')
  pricePerNight!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: 1 })
  maxGuests!: number;

  // ربط السكن بالمضيف (Host)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  host!: User;

  @CreateDateColumn()
  createdAt!: Date;
}