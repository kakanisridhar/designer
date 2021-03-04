import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LOGIN_MUTATION_RAW } from '@nestjs-graphql-react/common';
import { bootstapE2eApp } from '__e2e__/helpers/bootstrap';
import { expectUnauthorized } from '__e2e__/helpers/http-errors.expect';
import { adminUser } from 'auth/__e2e__/helpers/users';
import { UserEntity } from 'auth/users/users.entity';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { sendBasicRequest } from '__e2e__/helpers/request';

describe('Auth graphql Resolver with a jwt strategy (e2e)', () => {
  describe('e2e: [Auth] => login mutation (GRAPHQL)', () => {
    let app: INestApplication;
    let userRepository: Repository<UserEntity>;
    let usersFixture: UsersFixture;

    beforeAll(async () => {
      const { nestApp } = await bootstapE2eApp();
      app = nestApp;

      userRepository = app.get(getRepositoryToken(UserEntity));
      await userRepository.delete({});

      usersFixture = app.get(UsersFixture);
      await usersFixture.exec();
    });

    afterAll(async () => {
      await app.close();
    });

    describe('when success', () => {
      it('should return 2 auth token', async () => {
        const {
          body: { data },
        } = await sendBasicRequest(app)
          .send({
            query: LOGIN_MUTATION_RAW,
            variables: adminUser,
          })
          .expect(200);

        expect(data).toHaveProperty('login');
        expect(typeof data.login.accessToken).toMatch('string');
        expect(typeof data.login.refreshToken).toMatch('string');
      });
    });

    describe('when fail', () => {
      it('should return Unauthorized error', async () => {
        const {
          body: { errors },
        } = await sendBasicRequest(app)
          .send({
            query: LOGIN_MUTATION_RAW,
            variables: {
              email: 'johnson',
              password: 'jayzon',
            },
          })
          .expect(200);

        expectUnauthorized(errors);
      });
    });
  });
});
