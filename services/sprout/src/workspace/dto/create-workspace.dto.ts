import mongoose from 'mongoose';

export class CreateWorkspaceDto {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
}
