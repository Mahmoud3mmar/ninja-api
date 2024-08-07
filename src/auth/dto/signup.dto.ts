import {MinLength, IsString, IsEmail, IsNotEmpty, IsEnum} from 'class-validator'
import { Role } from '../schemas/Role.enum'
export class SignUpDto {


    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string


    @IsNotEmpty()
    @IsEmail({},{message:"please enter correct email"})
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string
    // @IsEnum(Role, { each: true })
    role:Role
}
