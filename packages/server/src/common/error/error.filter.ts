import {
  ArgumentsHost,
  Catch,
  ContextType,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Response } from 'express';

@Injectable()
@Catch()
export class ErrorFilter implements GqlExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  private sendResponse(
    host: ArgumentsHost,
    exception: Error,
    status: number,
    sendMessage = false,
  ) {
    const type = host.getType<ContextType & 'graphql'>();
    let ctx: HttpArgumentsHost;
    let res: Response;

    switch (type) {
      case 'http':
        ctx = host.switchToHttp();
        res = ctx.getResponse<Response>();

        res.status(status).send(sendMessage ? exception.message : exception);
        break;
      case 'graphql':
        return exception;
    }
  }

  catch(exception: Error, host: ArgumentsHost) {
    let error: HttpException;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    switch (status) {
      case HttpStatus.INTERNAL_SERVER_ERROR:
        this.logger.error(
          `Internal Error => ${status.toString()} ${exception.message}`,
        );
        this.logger.error(exception.stack);

        error = new InternalServerErrorException();
        this.sendResponse(host, error, status);
        break;
      case HttpStatus.NOT_FOUND:
        this.logger.warn(
          `Not found => ${status.toString()} ${exception.message}`,
        );
        this.sendResponse(host, exception, status, true);
        break;
      default:
        this.logger.warn(`Error => ${status.toString()} ${exception.message}`);
        this.sendResponse(host, exception, status);
        break;
    }
  }
}
