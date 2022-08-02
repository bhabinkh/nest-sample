import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from "src/user/user.schema"
import { UserService } from "src/user/user.service"
require('dotenv').config()

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload: { userId: string, pass: string }): Promise<User> {
        const user = await this.userService.getUser(payload.userId)
        if (!user) {
            throw new UnauthorizedException('Unauthorized user')
        }
        return user
    }

}