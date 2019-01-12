import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async create(user: User): Promise<any> {
     const newUser = new this.userModel(user);

     return await newUser.save();
  }

  async findByEmailAndPassword(user: any): Promise<any> {
    return await this.userModel.findOne(
      { email: user.email, password: user.password },
      ).exec();
  }
}
