import { Test } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../../user/services/user.service';
import { AuthModule } from '../auth.module';
import { UserModule } from '../../user/user.module';
import { UserFixtureModel } from '../../user/dtos/user.fixture.model';
import { userFixtures } from '../fixtures/user.fixtures';
import { getConnection } from 'typeorm';

describe('Aut', () => {
  let authService: AuthService;
  let userService: UserService;
  let authController: AuthController;
  let mockUsers: UserFixtureModel[] = userFixtures;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    authController = new AuthController(authService, userService);
  });

  it(`login should return token`, async () => {
    const user: any = mockUsers[0];
    const loginUser = {
      email: user.email,
      password: user.password,
    };

    jest.spyOn(userService, 'findByEmailAndPassword').mockImplementation(() => user);
    const response = await authController.login(loginUser);

    expect(response.token).toBeDefined();
  });

  it(`wrong login should be different`, async () => {
    const user: any = mockUsers[0];
    const loginUser = {
      email: 'wrong email',
      password: user.password,
    };

    jest.spyOn(userService, 'findByEmailAndPassword').mockImplementation(() => user);
    const response = await authController.login(loginUser);

    expect(response.user.email).not.toBe(loginUser.email);
  });

  it(`should register user`, async () => {
    const user: any = mockUsers[1];

    jest.spyOn(userService, 'create').mockImplementation(() => user);
    const response = await authController.create(user);

    expect(response.user).toBeDefined();
  });

  afterEach(async done => {
    await getConnection().close();
    done();
  });
});
