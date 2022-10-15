import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Component } from '../component/component.entity';
import { Comment } from '../comment/comment.entity';
import { Link } from '../link/link.entity';

export enum IssuePriority {
  LOWEST = 'lowest',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HIGHEST = 'highest',
}

export enum IssueStatus {
  TODO = 'todo',
  INPROGRESS = 'inProgress',
  REVIEW = 'review',
  QA = 'qa',
  DONE = 'done',
}

export enum IssueType {
  TASK = 'task',
  BUG = 'bug',
}

@Entity('issue')
export class Issue {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Unique issue identifier' })
  @Column({ unique: true })
  key: string;

  @ApiProperty({ example: 'string', description: 'Issue name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'string', description: 'Issue description' })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @ApiProperty({ example: 'string', description: 'Issue status', enum: IssueStatus })
  @Column({ type: 'enum', enum: IssueStatus, default: IssueStatus.TODO })
  status: IssueStatus;

  @ApiProperty({ example: false, description: 'Issue is backlog', default: false })
  @Column({ default: false })
  isBacklog: boolean;

  @ApiProperty({ example: 'string', description: 'Issue priority', enum: IssuePriority })
  @Column({ type: 'enum', enum: IssuePriority, default: IssuePriority.MEDIUM })
  priority: IssuePriority;

  @ApiProperty({ example: 'string', description: 'Issue type', enum: IssueType })
  @Column({ type: 'enum', enum: IssueType, default: IssueType.TASK })
  type: IssueType;

  @ApiProperty({ example: 0, description: 'Issue estimate' })
  @Column({ nullable: true })
  estimate: string;

  @ApiProperty({ example: 0, description: 'Issue story points' })
  @Column({ nullable: true })
  storyPoints: number;

  @ApiProperty({
    type: () => Project,
    example: { id: 0, name: 'string', ticket: 'string' },
    description: 'Issue creator id',
  })
  @ManyToOne(() => Project, (project) => project.issue, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Issue creator id' })
  @ManyToOne(() => User, (user) => user.issue, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  creator: User;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Issue assignee' })
  @ManyToOne(() => User, (user) => user.issueAssignee, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  assignee: User;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Issue reporter' })
  @ManyToOne(() => User, (user) => user.issueReporter, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  reporter: User;

  @ApiProperty({ description: 'Project component', example: { id: 0, name: 'string', description: 'string' } })
  @ManyToOne(() => Component, (component) => component.issue, { cascade: true, onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  component: Component;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comment: Comment[];

  @OneToMany(() => Link, (link) => link.sourceIssue)
  sourceIssue: Link;

  @OneToMany(() => Link, (link) => link.targetIssue)
  targetIssue: Link;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
