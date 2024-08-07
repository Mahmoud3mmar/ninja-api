import {MinLength, IsString, IsEmail, IsNotEmpty} from 'class-validator'
export class LoginDto {


    @IsNotEmpty()
    @IsEmail({},{message:"please enter correct email"})
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string

}
