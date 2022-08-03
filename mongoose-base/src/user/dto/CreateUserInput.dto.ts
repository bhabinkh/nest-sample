import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';


@InputType()
export class CreateUserInput {
    @Field()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    name?: string;

    @Field()
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Must be an email' })
    email?: string;

    //  1 uppercase, 1 number between 8-24 char
    @Field()
    @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w\S+]{8,24}$/, { message: 'Password must contain 1 uppercase 1 number and not less than 8 character' })
    password?: string;
}

