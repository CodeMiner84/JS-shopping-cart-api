import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async create(user: User): Promise<any> {
      const newUser = await this.userModel.findOne({ email: user.email, password: user.password }).exec();

      if (newUser === null) {
        return await new this.userModel(user).save();
      }

      return newUser;
  }

  async findByEmailAndPassword(user: any): Promise<any> {
    return await this.userModel.findOne(
      { email: user.email, password: user.password },
      ).exec();
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.userModel.findOne(
      { email },
      ).exec();
  }
}
