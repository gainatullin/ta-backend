import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    FileModule,
    forwardRef(() => UserModule),
    AuthenticationModule,
    ProjectUserRoleModule,
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
