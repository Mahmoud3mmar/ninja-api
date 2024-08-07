import { Get, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UsersService {


    constructor(
        @InjectModel(User.name) 
        private UserModel: mongoose.Model<User>
    ) { }
  
    async GetUsers(): Promise<User[]> {
        
        const Users = await this.UserModel.find()
        return Users
        
        
        
    }



}
