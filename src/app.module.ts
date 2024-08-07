import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/schemas/role.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/Ninja-API"),
    NinjasModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    
  //   {
  //   provide:APP_GUARD,
  //   useClass:RolesGuard
  // }

],
})
export class AppModule {}
