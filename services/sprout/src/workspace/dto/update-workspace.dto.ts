import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkspaceDto } from './create-workspace.dto';
import mongoose from 'mongoose';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  folderIds?: mongoose.Types.ObjectId[];
  tags?: mongoose.Types.ObjectId[];
}
