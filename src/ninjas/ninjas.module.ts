import { Module } from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { NinjasController } from './ninjas.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { NinjaSchema } from './schemas/ninja.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{name: 'Ninja', schema: NinjaSchema }])
],

  providers: [NinjasService],
  controllers: [NinjasController]
})
export class NinjasModule {}
