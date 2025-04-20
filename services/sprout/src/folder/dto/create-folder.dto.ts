import mongoose from 'mongoose';

export class CreateFolderDto {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
  noteIds: mongoose.Types.ObjectId[];
}
