import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

// Something about enableShutdownHooks
// see: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
// also: https://github.com/prisma/prisma/issues/11986
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  private readonly logger = new Logger('PrismaService');

  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$on('query', (e) => {
      this.logger.debug(e.query);
    });
  }
}
