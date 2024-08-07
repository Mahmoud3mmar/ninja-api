import { Body, Controller, Get, Post,Request, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth-guard';

@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService){}
    // @UseGuards(AuthGuard('local'))
    @Post('/signup')

    signup(@Body() SignUpDto:SignUpDto):Promise<{token:string}>{
        return this.AuthService.SignUp(SignUpDto)
    }



    @UseGuards(LocalAuthGuard)

    @Get('/login')
    Login(@Request() Req ,@Body() LoginDto:LoginDto):Promise<{token:string}>{
        return this.AuthService.Login(LoginDto)
    }
}

