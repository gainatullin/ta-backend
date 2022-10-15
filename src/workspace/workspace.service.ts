import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error-exception';
import { FileService } from '../file/file.service';
import { GetWorkspaceDto, SearchWorkspaceDto, UpdateWorkspaceDto } from './dto';
import { UserService } from '../user/user.service';
import { ProjectUserRoleService } from '../project-user-role/project-user-role.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    private fileService: FileService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private projectUserRoleService: ProjectUserRoleService,
  ) {}

  async create(dto, userId) {
    const user = await this.userService.getForProjectCreate(userId);
    const workspace = await this.workspaceRepository.save({ ...dto, creator: userId, users: [user] });
    return await this.getById({ id: workspace.id });
  }

  async getById(dto: GetWorkspaceDto) {
    const workspace = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .where({ id: dto.id })
      .select(['workspace', 'creator.id', 'creator.name'])
      .innerJoin('workspace.creator', 'creator')
      .getOne();

    if (!workspace) {
      new ErrorException({ message: 'Workspace not found', code: 'WORKSPACE_NOT_FOUND' }).throwError();
    }

    return workspace;
  }

  async getForProjectCreate(workspaceId: number) {
    return await this.workspaceRepository.findOne({ where: { id: workspaceId }, select: ['id', 'name'] });
  }

  async remove(dto: GetWorkspaceDto) {
    const workspace = await this.getById({ id: dto.id });
    await this.workspaceRepository.remove(workspace);
    return HttpStatus.OK;
  }

  async search(dto: SearchWorkspaceDto, userId) {
    const { limitation } = dto;

    const [list, count] = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .where({ creator: { id: userId } })
      .select(['workspace', 'creator.id', 'creator.name'])
      .innerJoin('workspace.creator', 'creator')
      .getManyAndCount();

    return {
      count,
      list,
    };
    // take: limitation.limit && limitation.limit,
    //   // skip: limitation && (limitation.offset - 1) * limitation.limit,
  }

  async update(dto: UpdateWorkspaceDto) {
    await this.workspaceRepository.save({ ...dto });
    return await this.getById({ id: dto.id });
  }

  async updateWorkspaceAvatar(avatar, id) {
    return await this.fileService.upload(avatar, id, 'workspaces');
  }

  async downloadAvatar(id, res) {
    return await this.fileService.download(id, res, 'workspaces');
  }

  async searchUsers(dto) {
    return await this.projectUserRoleService.getWorkspaceUsers(dto.id);
  }
}
