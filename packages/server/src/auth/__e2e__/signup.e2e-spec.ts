import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SIGNUP_MUTATION_RAW } from '@nestjs-graphql-react/common';
import { bootstapE2eApp } from '__e2e__/helpers/bootstrap';
import { expectHasError } from '__e2e__/helpers/http-errors.expect';
import { normalUser } from 'auth/__e2e__/helpers/users';
import { UserEntity } from 'auth/users/users.entity';
import { sendBasicRequest } from '__e2e__/helpers/request';

describe('e2e: [Auth Jwt] => signup mutaion (GRAPHQL)', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const { nestApp } = await bootstapE2eApp();

    app = nestApp;
    userRepository = app.get(getRepositoryToken(UserEntity));
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  describe('when sending with a valid payload', () => {
    it('should return the created user object', async () => {
      const {
        body: { data },
      } = await sendBasicRequest(app)
        .send({ query: SIGNUP_MUTATION_RAW, variables: normalUser })
        .expect(200);

      const user = await userRepository.findOne({ email: normalUser.email });

      expect(data.signup).toBeTruthy();
      expect(typeof user.id).toMatch('string');
      expect(user).toMatchObject({
        count: 0,
        email: normalUser.email,
      });
    });
  });

  describe('when sending without payload', () => {
    it('should return a 400 error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app)
        .send({ query: SIGNUP_MUTATION_RAW })
        .expect(400);

      expectHasError(errors);
    });
  });

  describe('when sending with an unvalid email', () => {
    it('should return a 400 error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app)
        .send({
          query: SIGNUP_MUTATION_RAW,
          variables: { email: 'foo.ff.com', password: 'EsdfSE@"/55"sfd4' },
        })
        .expect(400);

      expectHasError(errors);
    });
  });

  describe('when sending with an too weak password', () => {
    it('should return a 400 error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app).send({
        query: SIGNUP_MUTATION_RAW,
        variables: { email: 'foo@foo.com', password: '1234' },
      });
      // .expect(400);

      expectHasError(errors);
    });
  });
});
