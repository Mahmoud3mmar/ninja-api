import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private UserModel: mongoose.Model<User>,
        private JwtService: JwtService,
        private UsersService: UsersService

    ) { }


    async SignUp(SignUpDto: SignUpDto): Promise<any> {
        const { name, email, password,role } = SignUpDto
        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await this.UserModel.create({
            name,
            email,
            password: hashedpassword,
            role
        })
        const jwtpayload = { email: user.email, id: user._id ,role:user.role}
        return {
            access_token: this.JwtService.sign(jwtpayload)

        }
        
    }


    // async Login(LoginDto:LoginDto): Promise<{token:string}>{


    //     const {email,password}=LoginDto

    //     const user = await this.UserModel.findOne({email})
    //     if(!user){
    //         throw new UnauthorizedException('Invalid email or password')
    //     }
    //     const ispasswordmatch = await bcrypt.compare(password,user.password)
    //     if(!ispasswordmatch){

    //         throw new UnauthorizedException('Invalid email or password')
    //     }
    //     const jwtpayload = {id:user._id}
    //     const token = this.JwtService.sign(jwtpayload)
    //     return {token}
    // }
    async Login(LoginDto: LoginDto): Promise<any> {


        const { email, password } = LoginDto

        const user = await this.UserModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }
        const ispasswordmatch = await bcrypt.compare(password, user.password)
        if (!ispasswordmatch) {

            throw new UnauthorizedException('Invalid email or password')
        }
        const jwtpayload = { email: user.email, id: user._id }
        return {
            access_token: this.JwtService.sign(jwtpayload)

        }
    }



    async validateUser(email: string, password: string): Promise<any> {


        const user = await this.UserModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email')
        }




    }
}
