import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async create({ username, password }: { username: string; password: string }) {
    const user = new this.userModel({ username, password });
    return user.save();
  }
}
