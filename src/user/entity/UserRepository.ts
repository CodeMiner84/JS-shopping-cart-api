import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findAll() {
    return this.createQueryBuilder('user').getMany();
  }

  findTest(email) {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.email'])
      .where('user.email = :email', {email})
      .getOne();
  }

  async findDuplicate(email: string, username: string) {
    return await this.createQueryBuilder('user')
      .select(['user.id'])
      .where('user.email = :email', {email})
      .orWhere('user.username = :username', {username})
      .getOne();
  }
}
