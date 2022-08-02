import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/createUserInput.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) { }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        const user = this.userService.createUser(createUserInput)
        return user
    }
    @Query(() => [User])
    async listUser(): Promise<User[]> {
        const users = this.userService.listUser()
        return users
    }
}

