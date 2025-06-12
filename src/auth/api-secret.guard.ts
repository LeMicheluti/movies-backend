import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiSecretGuard implements CanActivate {
  private readonly apiSecret = '123456789';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-api-token'];
    if (token === this.apiSecret) {
      return true;
    }
    throw new UnauthorizedException('Invalid API token');
  }
}
