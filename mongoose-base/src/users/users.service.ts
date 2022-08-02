import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from './dto/userInput.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // Create new user
    async createUser(userInput: UserInput): Promise<User> {
        const createUser = await this.userModel.create(userInput);
        return createUser.save()
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users
    }
}
