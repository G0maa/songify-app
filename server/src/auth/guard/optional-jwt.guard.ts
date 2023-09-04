import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // if the request has an authorization header, then we can use the jwt guard
    if (request.headers.authorization) return super.canActivate(context);

    return true;
  }
}
