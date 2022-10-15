import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Document } from './document.entity';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), AuthenticationModule, ProjectUserRoleModule],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
