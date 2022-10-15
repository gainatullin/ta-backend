import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './component.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProjectModule } from '../project/project.module';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Component]), AuthenticationModule, ProjectModule, ProjectUserRoleModule],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
