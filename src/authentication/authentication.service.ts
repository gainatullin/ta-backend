import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(dto: SignInDto) {
    const { email, passwordHash } = dto;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    const isCompare = bcrypt.compare(passwordHash, user.passwordHash);

    if (!isCompare) {
      throw new BadRequestException("User doesn't exist");
    }

    return this.jwtService.sign({ user: user });
  }

  async signOut() {
    return true;
  }

  async getSelf(user) {
    return await this.userService.getByID(user.id);
  }
}
