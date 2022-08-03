import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/guard/gql.auth.guard';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    // controllers: [UsersController],
    providers: [UserResolver, UserService],
})

export class UserModule { }