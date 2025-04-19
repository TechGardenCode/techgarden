import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: Types.ObjectId, user: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
