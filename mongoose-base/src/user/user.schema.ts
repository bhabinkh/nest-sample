import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

@ObjectType()
export class User extends mongoose.Document {
    @Field(() => ID)
    id: mongoose.Types.ObjectId;

    @Field()
    name: string;

    @Field()
    email: string;

    @HideField()
    password: string;
}