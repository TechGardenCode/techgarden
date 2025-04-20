import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder, FolderDocument } from './schemas/folder.schemas';
import mongoose, { Model } from 'mongoose';
import { RequestContextService } from 'src/common/service/request-context.service';

@Injectable()
export class FolderService {
  constructor(
    private readonly requestContext: RequestContextService,
    @InjectModel(Folder.name)
    private folderModel: Model<FolderDocument>,
  ) {}

  async create(createFolderDto: CreateFolderDto) {
    if (!createFolderDto.name) {
      throw new BadRequestException('Folder name is required');
    }
    const existingFolder = await this.folderModel
      .findOne({
        name: createFolderDto.name,
        workspaceId: createFolderDto.workspaceId,
      })
      .exec();
    if (existingFolder) {
      throw new BadRequestException(
        `Folder '${createFolderDto.name}' already exists in workspace ${createFolderDto.workspaceId.toString()}`,
      );
    }
    return this.folderModel.create(createFolderDto);
  }

  findAll() {
    return `This action returns all folder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }

  getFoldersByWorkspaceId(workspaceId: mongoose.Types.ObjectId) {
    return this.folderModel.find({ workspaceId }).exec();
  }

  removeManyById(_id: mongoose.Types.ObjectId[]) {
    return this.folderModel.deleteMany({ _id }).exec();
  }

  async existsByIdAndOwned(
    folderId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    return this.folderModel.exists({ _id: folderId, ownerId: userId });
  }

  async removeById(folderId: mongoose.Types.ObjectId) {
    return this.folderModel.findOneAndDelete({ _id: folderId }).exec();
  }
}
