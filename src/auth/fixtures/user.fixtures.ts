import * as bcrypt from 'bcryptjs';
import { salt } from '../../user/contastants';
import { UserFixtureModel } from '../../user/dtos/user.fixture.model';

export const userFixtures: UserFixtureModel[] = [
  {
    id: 1,
    firstName: 'ex',
    lastName: 'ample',
    email: 'example1@example.com',
    username: 'example1',
    password: bcrypt.hashSync('password', salt),
  },
  {
    id: 2,
    firstName: 'ex',
    lastName: 'ample',
    email: 'example2@example.com',
    username: 'example2',
    password: bcrypt.hashSync('password', salt),
  },
];