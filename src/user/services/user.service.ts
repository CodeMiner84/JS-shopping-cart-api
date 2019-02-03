import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, salt } from '../contastants';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../entity/UserRepository';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<any> {
     return await this.userRepository.find();
  }

  async create(user: User): Promise<any> {
      const newUser = await this.userRepository.findDuplicate(user.email, user.username);

      if (newUser === undefined) {
        return await this.userRepository.insert({
          ...user,
          password: bcrypt.hashSync(user.password, salt),
          created: new Date(),
        });
      } else if (newUser !== null) {
        return -1;
      }

      return 0;
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
    return await this.userRepository.findTest(email);
  }
}
