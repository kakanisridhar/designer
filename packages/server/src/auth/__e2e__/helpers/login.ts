import { INestApplication } from '@nestjs/common';

import { HttpHeaders, LOGIN_MUTATION_RAW } from '@nestjs-graphql-react/common';
import { sendBasicRequest } from '__e2e__/helpers/request';
import { SignInArgs } from 'auth/dto/sign-in.args';

export async function login(app: INestApplication, user: SignInArgs) {
  const {
    body: {
      data: {
        login: { accessToken, refreshToken },
      },
    },
  } = await sendBasicRequest(app)
    .send({
      query: LOGIN_MUTATION_RAW,
      variables: user,
    })
    .expect(200);

  const preparedRequest = sendBasicRequest(app).set(
    HttpHeaders.AUTHORIZATION,
    `Bearer ${accessToken}`,
  );

  return {
    preparedRequest,
    accessToken,
    refreshToken,
  };
}
