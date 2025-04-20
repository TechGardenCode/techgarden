import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema()
export class Folder {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
  })
  workspaceId: mongoose.Types.ObjectId;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  memberIds: mongoose.Types.ObjectId[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  })
  noteIds: mongoose.Types.ObjectId[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
