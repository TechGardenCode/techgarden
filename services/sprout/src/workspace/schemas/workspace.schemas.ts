import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema()
export class Workspace {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: mongoose.Types.ObjectId;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  memberIds: mongoose.Types.ObjectId[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  })
  folderIds: mongoose.Types.ObjectId[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  })
  tags: mongoose.Types.ObjectId[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
