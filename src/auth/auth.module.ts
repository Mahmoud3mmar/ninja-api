import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';


import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { jwtstrategy } from './jwtstrategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './localstrategy';

// @Module({
//   // imports: [
//   //   UsersModule,
//   //   PassportModule,
//   //   PassportModule.register({defaultStrategy:'jwt'}),
//   //   JwtModule.registerAsync({
//   //     inject:[ConfigService],
//   //     useFactory:(config:ConfigService)=>{
//   //       return{
//   //         secret:config.get<string>('JWT_SECRET'),
//   //         signOptions:{
//   //           expiresIn:config.get<string|number>('JWT_EXPIRE')
//   //         }
//   //       }
//   //     },
//   //   }),
    
//   //   MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
//   // controllers: [AuthController],
//   // providers: [AuthService,LocalStrategy,jwtstrategy],
//   // exports:[AuthService,JwtModule]


//   imports:[
//     MongooseModule.forFeature([{name:'User',schema:UserSchema }]),
//     UsersModule,PassportModule,//   PassportModule.register({defaultStrategy:'jwt'}),
//       JwtModule.registerAsync({
//         inject:[ConfigService],
//         useFactory:(config:ConfigService)=>{
//           return{
//             secret:config.get<string>('JWT_SECRET'),
//             signOptions:{
//               expiresIn:config.get<string|number>('JWT_EXPIRE')
//             }
//           }
//         },
//       }),],
//   providers:[AuthService,LocalStrategy]
// })
// export class AuthModule {}
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRE'),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, jwtstrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}