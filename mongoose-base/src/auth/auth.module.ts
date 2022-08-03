import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
require('dotenv').config()

@Module({
  imports: [PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '30d' } }), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
