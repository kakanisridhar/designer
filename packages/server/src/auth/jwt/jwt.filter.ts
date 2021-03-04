import { ArgumentsHost, Catch, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { HttpHeaders } from '@nestjs-graphql-react/common';
import { ExpiredAccessTokenException } from 'auth/jwt/jwt.exception';
import { TokenService } from 'auth/jwt/token/token.service';
import { Env, IContext } from 'common/_utils';
import { UsersService } from 'auth/users/users.service';

@Catch(ExpiredAccessTokenException)
export class JwtFilter implements GqlExceptionFilter {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly token: TokenService,
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async catch(exception: ExpiredAccessTokenException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { req, res } = gqlHost.getContext<IContext>();
    const { fieldName } = gqlHost.getInfo();

    try {
      const { sub } = await this.jwtService.verifyAsync(
        req.headers[HttpHeaders.X_REFRESH_TOKEN] as string,
      );
      const user = await this.usersService.getOne({ where: { id: sub.id } });
      // Check if the user has reset his pawword recently
      if (sub.count !== user.count) {
        throw new Error();
      }

      const { accessToken, refreshToken } = this.token.generate(user);

      res.set({
        [HttpHeaders.X_ACCESS_TOKEN]: accessToken,
        [HttpHeaders.X_REFRESH_TOKEN]: refreshToken,
      });

      // Redo the http call with the valid access token
      const host = this.config.get(Env.HOST);
      const port = this.config.get(Env.PORT);
      const url = `http://${host}:${port}${req.originalUrl}`;
      const headers = {
        [HttpHeaders.AUTHORIZATION]: `Bearer ${accessToken}`,
      };

      const {
        data: { data },
      } = await this.http.post(url, req.body, { headers }).toPromise();

      return data[fieldName];
    } catch (err) {
      return new ExpiredAccessTokenException();
    }
  }
}
