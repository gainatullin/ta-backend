import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Invitation } from '../invitation/invitation.entity';

@Entity('workspace')
export class Workspace {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Workspace name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'string', description: 'Workspace description' })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Workspace owner id' })
  @ManyToOne(() => User, (user) => user.workspaces, { cascade: true, onDelete: 'CASCADE' })
  creator: User;

  @OneToMany(() => Project, (project) => project.workspace)
  projects: Project[];

  @OneToMany(() => Invitation, (invitation) => invitation.workspace)
  invitation: Invitation;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
