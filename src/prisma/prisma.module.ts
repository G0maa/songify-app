import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global: don't have to import this module in other modules
// Exports: PrismaService will be available in other modules
@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
