import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../project/project.entity';

@Entity('sprint')
export class Sprint {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Sprint name' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    type: () => Project,
    example: { id: 0, name: 'string', ticket: 'string' },
    description: 'Project',
  })
  @ManyToOne(() => Project, (project) => project.sprint)
  project: Project;

  @ApiProperty({ example: Date(), description: 'Sprint start date' })
  @Column({ type: 'datetime' })
  startDate: Date;

  @ApiProperty({ example: Date(), description: 'Sprint end date' })
  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
