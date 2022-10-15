import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Skill } from '../skill/skill.entity';

@Entity('resume')
export class Resume {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'User name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: '2022-02-27', description: 'Date of birthday' })
  @Column({ nullable: true })
  birthDate: Date;

  @ApiProperty({ example: 'string', description: 'Country' })
  @Column({ nullable: true, type: 'text' })
  country: string;

  @ApiProperty({ example: 'string', description: 'City' })
  @Column({ nullable: true, type: 'text' })
  city: string;

  @ApiProperty({ example: 'string', description: 'Education' })
  @Column({ nullable: true, type: 'text' })
  education: string;

  @ApiProperty({ example: 'string', description: 'Experience' })
  @Column({ nullable: true, type: 'text' })
  experience: string;

  @OneToOne(() => User, (user) => user.resume, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @ApiProperty({ example: 0, description: 'User skills' })
  @ManyToMany(() => Skill, (skill) => skill.resume, { cascade: true })
  @JoinTable({ name: 'resume_skills' })
  skills: Skill[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
