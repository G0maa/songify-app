import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MinIoModule } from 'src/min-io/min-io.module';

@Module({
  imports: [MinIoModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
