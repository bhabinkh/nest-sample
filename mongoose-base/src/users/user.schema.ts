import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

@ObjectType()
export class User extends mongoose.Document {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}