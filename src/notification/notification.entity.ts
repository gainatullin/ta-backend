import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('notification')
export class Notification {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Message' })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({ example: 'string', description: 'Unique category' })
  @Column()
  category: string;

  @ApiProperty({ example: Date(), description: 'Created date' })
  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;
}
