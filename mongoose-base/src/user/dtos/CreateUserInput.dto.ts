import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


@InputType()
export class CreateUserInput {
    @Field()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    name?: string;

    @Field()
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    @IsEmail({ message: 'Must be an email' })
    email?: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    password?: string;
}

