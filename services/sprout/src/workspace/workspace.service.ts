import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schemas';
import { RequestContextService } from 'src/common/service/request-context.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly requestContext: RequestContextService,
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    if (!createWorkspaceDto.name) {
      throw new BadRequestException('Workspace name is required');
    }
    const existingWorkspace = await this.findOneByName(
      createWorkspaceDto.ownerId,
      createWorkspaceDto.name,
    );
    if (existingWorkspace) {
      throw new BadRequestException(
        `Workspace '${createWorkspaceDto.name}' already exists`,
      );
    }
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return createdWorkspace.save();
  }

  async findAll(userId: mongoose.Types.ObjectId) {
    return this.workspaceModel
      .find()
      .or([{ memberIds: userId }, { ownerId: userId }])
      .exec();
  }

  async findOne(userId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId) {
    return this.workspaceModel
      .findOne({ _id: id })
      .or([{ memberIds: userId }, { ownerId: userId }]);
  }

  async findOneByName(userId: mongoose.Types.ObjectId, name: string) {
    return this.workspaceModel.findOne({ ownerId: userId, name }).exec();
  }

  async update(
    userId: mongoose.Types.ObjectId,
    id: mongoose.Types.ObjectId,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceModel
      .findOneAndUpdate({ _id: id, ownerId: userId }, updateWorkspaceDto, {
        new: true,
      })
      .exec();
  }

  async existsByIdAndOwned(
    id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    return this.workspaceModel.exists({ _id: id, ownerId: userId }).exec();
  }

  async removeById(workspaceId: mongoose.Types.ObjectId) {
    return this.workspaceModel.findByIdAndDelete(workspaceId).exec();
  }

  async addFolderById(
    workspaceId: mongoose.Types.ObjectId,
    folderId: mongoose.Types.ObjectId,
  ) {
    return this.workspaceModel
      .findOneAndUpdate(
        { _id: workspaceId },
        { $addToSet: { folderIds: folderId } },
        { new: true },
      )
      .exec();
  }

  async removeFolderById(
    workspaceId: mongoose.Types.ObjectId,
    folderId: mongoose.Types.ObjectId,
  ) {
    return this.workspaceModel
      .findOneAndUpdate(
        { _id: workspaceId },
        { $pull: { folderIds: folderId } },
        { new: true },
      )
      .exec();
  }
}
