import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export abstract class RolesGuard implements CanActivate {
  abstract getRequest(context: ExecutionContext): Request;
  abstract canActivate(context: ExecutionContext): Promise<boolean>;
}
