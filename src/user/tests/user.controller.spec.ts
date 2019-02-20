import { Test } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserModule } from '../user.module';
import { UserFixtureModel } from '../dtos/user.fixture.model';
import { userFixtures } from '../../auth/fixtures/user.fixtures';
import { getConnection } from 'typeorm';
import { UserController } from '../controllers/user.controller';
import { User } from '../entity/user.entity';

describe('User module', () => {
  let userService: UserService;
  let userController: UserController;
  let mockUsers: UserFixtureModel[] = userFixtures;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = new UserController(userService);
  });

  it(`should return all users`, async () => {
    const users: any = mockUsers;

    jest.spyOn(userService, 'findAll').mockImplementation(() => users);
    const response = await userController.getAll();

    expect(users.length).toBe(response.length);
  });

  it(`should update users`, async () => {
    const newEmail = 'test@example.com';
    const user: any = {
      ...mockUsers[0],
      email: newEmail,
    };

    jest.spyOn(userService, 'updateUser').mockImplementation(() => user);
    const response = await userController.updateUser(user, user.id);

    expect(response).toBeUndefined();
  });

  afterEach(async done => {
    await getConnection().close();
    done();
  });
});
