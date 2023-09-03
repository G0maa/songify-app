import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto';

export const ApiRegisterDocs = () => {
  return applyDecorators(
    ApiBody({
      type: CreateUserDto,
      examples: {
        'required only example': {
          value: {
            username: 'g0maa',
            email: 'g0maa@email.com',
            password: '123456',
          } as CreateUserDto,
        },
        'all fields example': {
          value: {
            firstName: 'Gustave',
            lastName: 'Le Bon',
            email: 'gustavo@lubun.com',
            password: 'gistavi',
            username: 'lub0n',
            gender: 'Male',
            birthDate: '1995-01-01',
            favoriteGenre: 'Pop',
          } as CreateUserDto,
        },
      },
      description: 'Request body example for register',
    }),
    ApiOkResponse({ description: 'User Registered' }),
    ApiBadRequestResponse({
      description:
        'Bad Request, missing fields, invalid data, or repeated unique field',
    }),
  );
};
