import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guard/gql.auth.guard";
import { CreateUserInput } from "./dto/CreateUserInput.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) { }

    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = this.userService.createUser(data)
        return user
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [User])
    async listUser(): Promise<User[]> {
        const users = this.userService.listUser()
        return users
    }
}

