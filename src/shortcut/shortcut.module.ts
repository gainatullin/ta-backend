import { Module } from '@nestjs/common';
import { ShortcutService } from './shortcut.service';
import { ShortcutController } from './shortcut.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortcut } from './shortcut.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProjectUserRoleModule } from '../project-user-role/project-user-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shortcut]), AuthenticationModule, ProjectUserRoleModule],
  providers: [ShortcutService],
  controllers: [ShortcutController],
})
export class ShortcutModule {}
