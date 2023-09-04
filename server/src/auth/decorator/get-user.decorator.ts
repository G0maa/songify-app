import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Is this a good idea? | the default value is undefined
    if (!request.user) return null;

    if (data) {
      if (request.user[data]) return request.user[data];
      else return null;
    }

    return request.user;
  },
);
