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
}
