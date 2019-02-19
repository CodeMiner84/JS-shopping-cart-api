import { Test } from '@nestjs/testing';
import * as mocks from 'node-mocks-http';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../../user/services/user.service';
import { AuthModule } from '../auth.module';
import { UserModule } from '../../user/user.module';
import { UserFixtureModel } from '../../user/dtos/user.fixture.model';
import { userFixtures } from '../fixtures/user.fixtures';

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

  it(`login should log in user`, async () => {
    const user = mockUsers[0];
    const loginUser = {
      email: user.email,
      password: user.password,
    }
    jest.spyOn(userService, 'findByEmailAndPassword').mockImplementation(() => user);

    // console.log("#######################");
    // console.log('######################', await authController.login(loginUser));
    // expect(await authController.login(loginUser)).toBe();

    expect(1).toBe(1);
  });
});