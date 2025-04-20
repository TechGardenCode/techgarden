import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import mongoose from 'mongoose';
import { OrchestratorService } from 'src/orchestrator/orchestrator.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RequestContextGuard } from 'src/common/guards/request-context.guard';

@Controller()
export class FolderController {
  constructor(
    private readonly orchestratorService: OrchestratorService,
    private readonly folderService: FolderService,
  ) {}

  @UseGuards(AccessTokenGuard, RequestContextGuard)
  @Post('folders')
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.orchestratorService.createFolder(createFolderDto);
  }

  @UseGuards(AccessTokenGuard, RequestContextGuard)
  @Get('workspaces/:workspaceId/folders')
  getFoldersByWorkspaceId(
    @Param('workspaceId') workspaceId: mongoose.Types.ObjectId,
  ) {
    return this.folderService.getFoldersByWorkspaceId(workspaceId);
  }

  @UseGuards(AccessTokenGuard, RequestContextGuard)
  @Get('folders/:id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.folderService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard, RequestContextGuard)
  @Patch('folders/:id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.folderService.update(+id, updateFolderDto);
  }

  @UseGuards(AccessTokenGuard, RequestContextGuard)
  @Delete('folders/:id')
  remove(@Param('id') id: mongoose.Types.ObjectId) {
    return this.orchestratorService.deleteFolder(id);
  }
}
