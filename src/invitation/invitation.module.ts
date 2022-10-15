import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), AuthenticationModule, UserModule, ProjectModule, MailModule],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
