// src/common/request-context.service.ts
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable({ })
export class RequestContextService {
  private _userId?: mongoose.Types.ObjectId;

  set userId(id: mongoose.Types.ObjectId) {
    this._userId = id;
  }

  get userId(): mongoose.Types.ObjectId {
    if (!this._userId) {
      throw new Error('User ID is not set in the request context');
    }
    return this._userId;
  }
}
