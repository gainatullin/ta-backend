import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserRole } from './project-user-role.entity';
import { ProjectUserRoleService } from './project-user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserRole])],
  providers: [ProjectUserRoleService],
  exports: [ProjectUserRoleService],
})
export class ProjectUserRoleModule {}
