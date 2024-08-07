import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { JwtGuard } from './auth/jwt-guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/schemas/Roles.decorator';
import { Role } from './auth/schemas/Role.enum';
import { RolesGuard } from './auth/schemas/role.guards';

@Controller()
export class AppController {
  constructor(private readonly AuthService: AuthService) {}


  // // @UseGuards(LocalAuthGuard)
  // @Get('login')
  // login(@Request() Req): any {
  //   return Req.user
  // }
  @UseGuards(JwtGuard, RolesGuard)
  @Get('protected')
  @Roles(Role.ADMIN)

  getHello(@Request() Req): any {

    return Req.user
  }
}
