import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UserInput } from "./dto/userInput.dto";
import { User } from "./user.schema";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

    @Mutation(() => User)
    async createUser(@Args('input') input: UserInput): Promise<User> {
        const user = await this.usersService.createUser(input)
        return user
    }
    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = this.usersService.getAllUsers()
        return users
    }
}

