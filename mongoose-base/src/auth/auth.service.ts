import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/AuthInput.dto';
import { AuthType } from './dto/AuthType.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser({ email, password }: AuthInput): Promise<AuthType> {
        const user = await this.userService.getUser(email)
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                throw new UnauthorizedException('Incorrect Credentials')
            }
        }
        const token = await this.createJwtToken(user)
        return {
            user,
            token
        }
    }

    private async createJwtToken(user: User): Promise<string> {
        const payload = { userId: user.id, pass: user.password.slice(0, 8) }
        return this.jwtService.signAsync(payload)
    }

}
