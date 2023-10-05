import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiGetProfileDocs = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ description: 'User profile.' }),
    ApiUnauthorizedResponse({ description: 'User unauthenticated' }),
  );
};
