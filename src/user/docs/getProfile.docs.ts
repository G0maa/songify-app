import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';

export const ApiGetProfileDocs = () => {
  return applyDecorators(
    ApiOkResponse({ description: 'User profile.' }),
    ApiForbiddenResponse({ description: 'Incorrect or invalid credentials.' }),
  );
};
