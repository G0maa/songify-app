import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

export const ApiUploadProfilePictureDocs = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
};
