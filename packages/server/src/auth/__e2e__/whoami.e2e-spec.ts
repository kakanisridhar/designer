import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import request from 'supertest';

import {
  HttpHeaders,
  Roles,
  WHO_AM_I_QUERY_RAW,
} from '@nestjs-graphql-react/common';
import { bootstapE2eApp } from '__e2e__/helpers/bootstrap';
import { login } from 'auth/__e2e__/helpers/login';
import {
  generateOutdatedAccessToken,
  generateOutdatedRefreshToken,
} from 'auth/__e2e__/helpers/token';
import { expectMissingToken } from 'auth/__e2e__/helpers/token-errors.expect';
import { adminUser } from 'auth/__e2e__/helpers/users';
import { UserEntity } from 'auth/users/users.entity';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendBasicRequest } from '__e2e__/helpers/request';

function expectWhoami(data: { whoAmI: UserEntity }) {
  expect(data).toHaveProperty('whoAmI');
  expect(typeof data.whoAmI.id).toMatch('string');
  expect(data.whoAmI).toMatchObject({
    email: adminUser.email,
    roles: [Roles.ADMIN],
  });
}

describe('e2e: [Auth Jwt] => whoami query (GRAPHQL)', () => {
  let app: INestApplication;
  let http: ExpressAdapter;
  let usersFixture: UsersFixture;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const { nestApp, expressApp } = await bootstapE2eApp({ http: true });

    app = nestApp;
    http = expressApp;

    userRepository = app.get(getRepositoryToken(UserEntity));
    await userRepository.delete({});

    usersFixture = app.get(UsersFixture);
    await usersFixture.exec();
  });

  afterAll(async () => {
    await Promise.all([userRepository.delete({}), http.close()]);
    await app.close();
  });

  describe('when sending with a valid access token', () => {
    let loggedInRequest: request.Test;

    beforeEach(async () => {
      const { preparedRequest } = await login(app, adminUser);

      loggedInRequest = preparedRequest;
    });

    it('should return a user object', async () => {
      const {
        body: { data },
      } = await loggedInRequest.send({ query: WHO_AM_I_QUERY_RAW }).expect(200);

      expectWhoami(data);
    });
  });

  describe('when sending without access token', () => {
    it('should return a missing token error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app)
        .send({ query: WHO_AM_I_QUERY_RAW })
        .expect(200);

      expectMissingToken(errors);
    });
  });

  describe('when sending with an expired access token', () => {
    describe('and a valid refresh token', () => {
      let loggedInRequest: request.Test;

      beforeEach(async () => {
        const { preparedRequest, refreshToken } = await login(app, adminUser);

        loggedInRequest = preparedRequest.set(
          HttpHeaders.X_REFRESH_TOKEN,
          refreshToken,
        );
      });
      it('should return a user object', async () => {
        const {
          body: { data },
        } = await loggedInRequest
          .set(HttpHeaders.AUTHORIZATION, generateOutdatedAccessToken())
          .send({ query: WHO_AM_I_QUERY_RAW })
          .expect(200);

        expectWhoami(data);
      });
    });

    describe('and an expired refresh token', () => {
      it('should return a missing token error', async () => {
        const {
          body: { errors },
        } = await sendBasicRequest(app)
          .set(HttpHeaders.X_REFRESH_TOKEN, generateOutdatedRefreshToken())
          .set(HttpHeaders.AUTHORIZATION, generateOutdatedAccessToken())
          .send({ query: WHO_AM_I_QUERY_RAW })
          .expect(200);

        expectMissingToken(errors);
      });
    });
  });
});
