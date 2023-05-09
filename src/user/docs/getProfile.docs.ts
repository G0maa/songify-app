import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiGetProfileDocs = () => {
  return applyDecorators(
    ApiOkResponse({ description: 'User profile.' }),
    ApiUnauthorizedResponse({ description: 'User unauthenticated' }),
  );
};
