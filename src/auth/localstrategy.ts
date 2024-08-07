import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";





@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService,
    @InjectModel(User.name) 
    private UserModel: mongoose.Model<User>
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.UserModel.findOne({email});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}