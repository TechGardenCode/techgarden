import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProvider],
  exports: [UsersService],
})
export class UsersModule {}
