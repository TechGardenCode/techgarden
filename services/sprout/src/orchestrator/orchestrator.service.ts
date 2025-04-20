import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { RequestContextService } from 'src/common/service/request-context.service';
import { CreateFolderDto } from 'src/folder/dto/create-folder.dto';
import { FolderService } from 'src/folder/folder.service';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly workspaceService: WorkspaceService,
    private readonly folderService: FolderService,
  ) {}

  async deleteWorkspace(workspaceId: mongoose.Types.ObjectId) {
    const userId = this.requestContext.userId;
    if (
      !(await this.workspaceService.existsByIdAndOwned(workspaceId, userId))
    ) {
      throw new BadRequestException('Workspace not found or not owned by user');
    }
    const folders =
      await this.folderService.getFoldersByWorkspaceId(workspaceId);
    // get notes by folder id
    // delete notes
    await this.folderService.removeManyById(
      folders.map((folder) => folder._id),
    );
    await this.workspaceService.removeById(workspaceId);
  }

  async deleteFolder(folderId: mongoose.Types.ObjectId) {
    const userId = this.requestContext.userId;
    if (!(await this.folderService.existsByIdAndOwned(folderId, userId))) {
      throw new BadRequestException('Folder not found or not owned by user');
    }
    // get notes by folder id
    // delete notes
    const folder = await this.folderService.removeById(folderId);
    if (!folder) {
      throw new BadRequestException('Folder not found');
    }
    await this.workspaceService.removeFolderById(folder.workspaceId, folderId);
  }

  async deleteNote(noteId: mongoose.Types.ObjectId) {
    // delete note
    // delete note from folder
  }

  async createFolder(createFolderDto: CreateFolderDto) {
    const folder = await this.folderService.create({
      ...createFolderDto,
      ownerId: this.requestContext.userId,
    });
    await this.workspaceService.addFolderById(folder.workspaceId, folder._id);
  }

  async createNote(folderId: mongoose.Types.ObjectId) {
    // create note
    // add note to folder
  }
}
