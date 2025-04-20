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
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Request } from 'express';
import mongoose from 'mongoose';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req: Request, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.workspaceService.create({
      ...createWorkspaceDto,
      ownerId: userId,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.workspaceService.findAll(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: mongoose.Types.ObjectId) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.workspaceService.findOne(userId, id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.workspaceService.update(userId, id, updateWorkspaceDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: mongoose.Types.ObjectId) {
    const userId = req.user!['sub'] as mongoose.Types.ObjectId;
    return this.workspaceService.remove(userId, id);
  }
}
