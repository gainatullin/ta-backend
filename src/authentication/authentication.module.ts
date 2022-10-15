import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'backend',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
