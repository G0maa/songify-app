import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from '../dto';

export const ApiLoginDocs = () => {
  return applyDecorators(
    ApiBody({
      type: LoginUserDto,
      examples: {
        'ex 1': {
          value: {
            username: 'g0maa',
            password: '123456',
          } as LoginUserDto,
        },
        'ex 2': {
          value: {
            username: 'lub0n',
            password: 'gistavi',
          } as LoginUserDto,
        },
      },
      description: 'Request body example for register',
    }),
    ApiOkResponse({ description: 'User Logged In' }),
    ApiBadRequestResponse({ description: 'Bad Request, e.g. invalid data' }),
    ApiForbiddenResponse({ description: 'Invalid credentials' }),
  );
};
