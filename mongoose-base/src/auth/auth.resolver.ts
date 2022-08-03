import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/AuthInput.dto';
import { AuthType } from './dto/AuthType.dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }
    @Mutation(() => AuthType)
    async login(@Args('data') data: AuthInput): Promise<AuthType> {
        const { user, token } = await this.authService.validateUser(data)
        return { user, token }
    }
}
