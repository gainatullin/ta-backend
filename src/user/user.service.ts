import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { ErrorException } from '../exceptions/error-exception';
import { FileService } from '../file/file.service';
import { CreateUserDto, SearchUsersDto, UpdateUserDto } from './dto';
import { WorkspaceService } from '../workspace/workspace.service';
import { MailService } from '../mail/mail.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileService: FileService,
    private mailService: MailService,
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (user) {
      new ErrorException({ message: 'User already exists', code: 'USER_ALREADY_EXISTS' }).throwError();
    }

    const hashPassword = await bcrypt.hash(dto.passwordHash, 12);

    const newUser = await this.userRepository.save({
      ...dto,
      passwordHash: hashPassword,
    });

    await this.mailService.send(dto.email, 'Registration', 'Congrats', 'You have been registered!');
    await this.workspaceService.create({ name: 'My workspace' }, newUser.id);

    return await this.getByID(newUser.id);
  }

  async getByID(id: number) {
    return await this.userRepository.findOne({ where: { id: id }, select: ['id', 'name', 'email'] });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'passwordHash'],
    });
  }

  async getAll(dto: SearchUsersDto) {
    const [list, count] = await this.userRepository.findAndCount();

    return {
      list,
      count,
    };
  }

  async updateUser(dto: UpdateUserDto, userId) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      new ErrorException({ message: 'User not found', code: 'USER_NOT_FOUND' }).throwError();
    }

    let newPassword = '';
    if (dto.passwordHash) {
      newPassword = await bcrypt.hash(dto.passwordHash, 12);
    }

    const updatedUser = await this.userRepository.save({
      id: userId,
      name: dto.name || user.name,
      email: dto.email || user.email,
      passwordHash: newPassword.length ? newPassword : dto.passwordHash,
    });
    return await this.userRepository.findOne({ where: { id: updatedUser.id }, select: ['id', 'name', 'email'] });
  }

  async getForProjectCreate(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async uploadAvatar(avatar, userId) {
    return await this.fileService.upload(avatar, userId, 'users');
  }

  async downloadAvatar(id, res) {
    return await this.fileService.download(id, res, 'users');
  }
}
