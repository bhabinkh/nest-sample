import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';

@ObjectType()
export class AuthType {
    @Field(() => User)
    user?: User

    @Field()
    token?: string
}