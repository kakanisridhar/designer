import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';
import { compose, toLower, prop, sortWith, descend } from 'ramda';

import { Roles, GET_USERS_QUERY_RAW } from '@nestjs-graphql-react/common';
import { bootstapE2eApp } from '__e2e__/helpers/bootstrap';
import { expectUnauthorized } from '__e2e__/helpers/http-errors.expect';
import { login } from 'auth/__e2e__/helpers/login';
import { sendBasicRequest } from '__e2e__/helpers/request';
import { adminUser, normalUser } from 'auth/__e2e__/helpers/users';
import { UserEntity } from 'auth/users/users.entity';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { UsersFakerFixture } from 'auth/users/fixture/fixture.service.faker';
import { Order } from 'common/_utils';

describe('e2e: [Auth users] => getUsers query (GRAPHQL)', () => {
  let app: INestApplication;
  let http: ExpressAdapter;
  let usersFixture: UsersFakerFixture;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const { nestApp, expressApp } = await bootstapE2eApp();

    app = nestApp;
    http = expressApp;

    userRepository = app.get(getRepositoryToken(UserEntity));
    await userRepository.delete({});

    usersFixture = app.get(UsersFixture);
    await usersFixture.exec();
    await usersFixture.createManyUser(10, Roles.NORMAL);
  });

  afterAll(async () => {
    await Promise.all([userRepository.delete({}), http.close()]);
    await app.close();
  });

  describe('when sending with a valid admin access token', () => {
    let loggedInRequest: request.Test;

    beforeEach(async () => {
      const { preparedRequest } = await login(app, adminUser);

      loggedInRequest = preparedRequest;
    });

    it('should return a list of 11 user object', async () => {
      const {
        body: { data },
      } = await loggedInRequest
        .send({ query: GET_USERS_QUERY_RAW })
        .expect(200);

      expect(data.getUsers.length).toBe(11);
    });

    describe('whith pagination args', () => {
      it('should paginate users', async () => {
        const {
          body: { data },
        } = await loggedInRequest
          .send({
            query: GET_USERS_QUERY_RAW,
            variables: { skip: 10, take: 3 },
          })
          .expect(200);

        expect(data.getUsers.length).toBe(1);
      });

      it('should paginate users', async () => {
        const {
          body: { data },
        } = await loggedInRequest
          .send({ query: GET_USERS_QUERY_RAW, variables: { skip: 2, take: 9 } })
          .expect(200);

        expect(data.getUsers.length).toBe(9);
      });
    });

    describe('with sort args', () => {
      it('should sort users by a given property', async () => {
        const {
          body: { data: baseData },
        } = await loggedInRequest
          .send({
            query: GET_USERS_QUERY_RAW,
          })
          .expect(200);

        const { preparedRequest } = await login(app, adminUser);
        const {
          body: { data },
        } = await preparedRequest
          .send({
            query: GET_USERS_QUERY_RAW,
            variables: { sortBy: 'email', order: Order.DESC },
          })
          .expect(200);

        const sortedByMail = sortWith([
          descend(compose(toLower, prop('email'))),
        ])(baseData.getUsers);

        expect(baseData.getUsers).not.toEqual(data.getUsers);
        expect(data.getUsers).toEqual(sortedByMail);
      });
    });
  });

  describe('when sending whith a no access token', () => {
    it('should return an unAuthorized error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app)
        .send({ query: GET_USERS_QUERY_RAW })
        .expect(200);

      expectUnauthorized(errors);
    });
  });

  describe('when sending whith a non admin token', () => {
    let loggedInRequest: request.Test;
    beforeEach(async () => {
      await usersFixture.createUser({ ...normalUser, roles: [Roles.NORMAL] });
      const { preparedRequest } = await login(app, normalUser);

      loggedInRequest = preparedRequest;
    });

    it('should return an unAuthorized error', async () => {
      const {
        body: { errors },
      } = await loggedInRequest
        .send({ query: GET_USERS_QUERY_RAW })
        .expect(200);

      expectUnauthorized(errors);
    });
  });
});
