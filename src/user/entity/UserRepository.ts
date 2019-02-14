import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from '../dtos/user-register.dto';
import { SimpleUserDto } from '../dtos/user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findAll() {
    return this.createQueryBuilder('user').getMany();
  }

  findOneByEmail(email: string): Promise<SimpleUserDto | null> {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email', 'user.firstName', 'user.lastName'])
      .where('user.email = :email', {email})
      .getOne();
  }

  async findDuplicate(email: string, username: string): Promise<RegisterUserDto | null> {
    return await this.createQueryBuilder('user')
      .select(['user.id'])
      .where('user.email = :email', {email})
      .orWhere('user.username = :username', {username})
      .getOne();
  }

  async findDuplicateUsername(username: string, id: number) {
    return await this.createQueryBuilder('user')
      .select(['user.id'])
      .where('user.username = :username', {username})
      .andWhere('user.id != :id', {id})
      .getOne();
  }
}
