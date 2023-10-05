import { Module } from '@nestjs/common';
import { MinIoService } from './min-io.service';

@Module({
  providers: [MinIoService],
  exports: [MinIoService],
})
export class MinIoModule {}
