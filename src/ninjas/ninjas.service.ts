import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import mongoose from 'mongoose';
import { Ninja } from './schemas/ninja.schema';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class NinjasService {

    constructor(
        @InjectModel(Ninja.name)
        private NinjaModel: mongoose.Model<Ninja>
    ) { }

    async getNinjas(weapon?: 'stars' | 'Nunchucks'): Promise<Ninja[]> {
        if (weapon){
            const ninjas = await this.NinjaModel.find()
            return ninjas
        }
        
        
    }

    async CreateNinja(CreateNinjaDto: CreateNinjaDto): Promise<Ninja> {
        
        const ninjas = await this.NinjaModel.create(CreateNinjaDto)
        return ninjas
    }
    // }

    async getOneNinja(id:string): Promise<Ninja> {

        const ninja = await this.NinjaModel.findById(id)
        if(!ninja){
            throw new NotFoundException("NinjaNotFound")
        }
        return ninja

        
        
    }
        

    

    async UpdateNinja(id: string, UpdateNinjaDto: UpdateNinjaDto): Promise<Ninja>{
        const ninja = await this.NinjaModel.findByIdAndUpdate(id,UpdateNinjaDto,{
            new:true,

        })
        if (!ninja) {
            throw new NotFoundException("NinjaNotFound")
        }
        
        return ninja
    }
    async DeleteNinja(id: string) {
        const ninja = await this.NinjaModel.findByIdAndDelete(id)

       if (!ninja) {
        throw new NotFoundException("NinjaNotFound")
        }
        return ninja
    }


}