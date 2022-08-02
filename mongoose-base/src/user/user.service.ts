import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUserInput.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // create new user
    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.userModel.create(createUserInput);
        return user.save()
    }

    // list users
    async listUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users
    }
}
