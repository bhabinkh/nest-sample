import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { CreateUserInput } from './dto/CreateUserInput.dto';
import { User } from './user.schema';


@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // create new user
    async createUser(data: CreateUserInput): Promise<User> {
        const exisitingUser = await this.userModel.findOne({ email: data.email })
        if (exisitingUser) {
            throw new BadRequestException('User already exist')
        }
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const newUser = { email: data.email, name: data.name, password: hashedPassword }
        const user = await this.userModel.create(newUser);
        user.save()
        return user
    }

    // get user
    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)
        if (user) {
            return user
        }
        return null
    }

    // get user
    async getUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email })
        if (user) {
            return user
        }
        return null
    }

    // list users
    async listUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        // const user = await this.userModel.deleteMany()
        return users
    }
}
