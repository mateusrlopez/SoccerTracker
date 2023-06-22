import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserRepositoryProvider, UserServiceProvider } from './user.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserRepositoryProvider, UserServiceProvider],
    exports: [UserServiceProvider],
})
export class UserModule {}
