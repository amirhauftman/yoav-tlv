import { SetMetadata } from '@nestjs/common';


export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);