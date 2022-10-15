import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '../resume/resume.entity';

@Entity('skill')
export class Skill {
  @ApiProperty({ example: 0, description: 'Skill id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Skill name' })
  @Column({ unique: true })
  value: string;

  @ManyToMany(() => Resume, (resume) => resume.skills)
  resume: Resume;
}
