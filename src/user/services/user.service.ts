import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.dto';
import { USER_REPOSITORY, salt } from '../contastants';
import { Repository, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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
          password: bcrypt.hashSync(user.password, salt),
          created: new Date(),
        });
      }

      return await null;
  }

  async findByEmailAndPassword(params: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ email: params.email });
    if (!user) {
      return null;
    }

    const password = await bcrypt.compare(params.password, user.password);
    if (!password) {
      return null;
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne(
      { email },
      { select: ['id', 'username', 'email'] },
      );
  }
}
