import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './sprint.entity';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), AuthenticationModule],
  providers: [SprintService],
  controllers: [SprintController],
})
export class SprintModule {}
