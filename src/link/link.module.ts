import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  providers: [LinkService],
  controllers: [LinkController],
  imports: [TypeOrmModule.forFeature([Link]), AuthenticationModule],
})
export class LinkModule {}
