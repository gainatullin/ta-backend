import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

export enum Roles {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
  VIEWER = 'VIEWER',
}

@Entity('project_users_role')
export class ProjectUserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.projectsUsersRoles, { cascade: true, onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectsUsersRoles, { cascade: true, onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: Roles, default: Roles.WORKER })
  role: Roles;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
