import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error-exception';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
    private userService: UserService,
    private projectService: ProjectService,
    private mailService: MailService,
  ) {}

  async create(dto, creatorId) {
    const alreadyExistsUser = await this.userService.getByEmail(dto.email);

    if (alreadyExistsUser) {
      return await this.projectService.addUser({ id: dto.projectId, userId: alreadyExistsUser.id });
    }

    const alreadySendInvite = await this.invitationRepository.findOneBy({ email: dto.email });

    if (alreadySendInvite) {
      return this.mailService.send(
        `${alreadySendInvite.email}`,
        'Invitation',
        "Here's invite for you",
        `Hi there! <a href="http://80.87.195.143/?i=${alreadySendInvite.id}&c=${String(
          alreadySendInvite.confirmationCode,
        )}">Invite to project</a> <strong> HTML version</strong>`,
      );
    }

    const confirmationCode = (Math.random() + 1).toString(36).substring(6).toUpperCase();
    const invitation = await this.invitationRepository.save({
      ...dto,
      confirmationCode: confirmationCode,
      project: dto.projectId,
      workspace: dto.workspaceId,
      creator: creatorId,
    });

    await this.mailService.send(
      `${invitation.email}`,
      'Invitation',
      "Here's invite for you",
      `Hi there! <a href="http://80.87.195.143/?i=${invitation.id}&c=${String(
        confirmationCode,
      )}">Invite to project</a> <strong> HTML version</strong>`,
    );

    return HttpStatus.OK;
  }

  async confirm(dto) {
    const invitation = await this.invitationRepository.findOne({
      where: { id: dto.id },
      relations: ['project', 'workspace'],
    });

    if (!invitation) {
      new ErrorException({ message: 'Invitation not found', code: 'INVITATION_NOT_FOUND' }).throwError();
    }

    const isCorrectConfirmationCode = invitation.confirmationCode === dto.confirmationCode;
    if (!isCorrectConfirmationCode) {
      new ErrorException({
        message: 'Confirmation code is not correct',
        code: 'CONFIRMATION_CODE_IS_NOT_CORRECT',
      }).throwError();
    }

    const newUser = await this.userService.createUser({
      name: invitation.name,
      email: invitation.email,
      passwordHash: dto.passwordHash,
    });
    await this.projectService.addUser({ id: invitation.project.id, userId: newUser.id });
    await this.invitationRepository.save({ ...invitation, isConfirm: true });

    return newUser;
  }

  async getById(dto) {
    const invitation = await this.invitationRepository.findOne({
      where: { id: dto.id },
      relations: ['project', 'workspace', 'creator'],
    });

    if (!invitation) {
      new ErrorException({ message: 'Invitation not found', code: 'INVITATION_NOT_FOUND' }).throwError();
    }

    return invitation;
  }

  async search(dto) {
    if (!Object.keys(dto).length) {
      new ErrorException({ message: 'Empty request', code: 'EMPTY_REQUEST' }).throwError();
    }

    const [list, count] = await this.invitationRepository.findAndCount({
      where: { isConfirm: false, project: { id: dto.projectId } },
      select: ['id', 'name', 'email', 'createdDate', 'updatedDate'],
    });

    return {
      list,
      count,
    };
  }
}
