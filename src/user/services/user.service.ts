import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.dto';
import { USER_REPOSITORY } from '../contastants';
import { Repository, Entity } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
     return await this.userRepository.find();
  }

  async create(user: User): Promise<any> {
      const newUser = await this.userRepository.findOne({ email: user.email, password: user.password });

      if (newUser == null) {
        return await this.userRepository.insert({
          ...user,
          created: new Date(),
        });
      }

      return await null;
  }

  async findByEmailAndPassword(user: any): Promise<any> {
    return await this.userRepository.findOne(
      { email: user.email, password: user.password },
      );
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne(
      { email },
      );
  }
}
