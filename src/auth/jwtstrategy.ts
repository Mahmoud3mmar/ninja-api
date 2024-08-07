import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import mongoose from "mongoose";
import { User } from "./schemas/user.schema";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService,
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>     ,
    private ConfigService:ConfigService
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: ConfigService.get<string>('JWT_SECRET'), // Corrected here
        usernameField: 'email',

      
    });
  }

  async validate(jwtpayload:any){
    // return{
    //     email: jwtpayload.email,
    //     id: jwtpayload.id

    // }
    const user = await this.UserModel.findById(jwtpayload.id)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}