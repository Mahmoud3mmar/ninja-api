import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/schemas/user.schema';

@Controller('users')
export class UsersController {
    
    constructor(private readonly UsersService:UsersService){}

    @Get()
    async GetUsers() :Promise <User []>  {
        return this.UsersService.GetUsers()
    }
}




