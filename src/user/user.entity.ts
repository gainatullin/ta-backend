import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Workspace } from '../workspace/workspace.entity';
import { Resume } from '../resume/resume.entity';
import { Project } from '../project/project.entity';
import { Issue } from '../issue/issue.entity';
import { Component } from '../component/component.entity';
import { Invitation } from '../invitation/invitation.entity';
import { Comment } from '../comment/comment.entity';
import { ProjectUserRole } from '../project-user-role/project-user-role.entity';
import { Document } from '../document/document.entity';
import { Notification } from '../notification/notification.entity';

@Entity('user')
export class User {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'string', description: 'User email' })
  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @OneToMany(() => Workspace, (workspace) => workspace.creator, { onDelete: 'CASCADE' })
  workspaces: Workspace[];

  @OneToOne(() => Resume, (resume) => resume.creator)
  resume: Resume;

  @OneToMany(() => Project, (project) => project.creator)
  projects: Project[];

  @OneToMany(() => Issue, (issue) => issue.creator)
  issue: Issue[];

  @OneToMany(() => Issue, (issue) => issue.assignee)
  issueAssignee: Issue;

  @OneToMany(() => Issue, (issue) => issue.reporter)
  issueReporter: Issue;

  @OneToMany(() => Component, (component) => component.lead)
  componentLead: Component;

  @OneToMany(() => Project, (project) => project.lead)
  projectLead: Project;

  @OneToMany(() => Invitation, (invitation) => invitation.creator)
  invitation: Invitation;

  @OneToMany(() => Comment, (comment) => comment.creator)
  comment: Comment;

  @OneToMany(() => ProjectUserRole, (projectUserRole) => projectUserRole.user)
  projectsUsersRoles: ProjectUserRole[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Document, (document) => document.creator)
  document: Document[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[];
}
