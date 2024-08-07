import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { Ninja } from './schemas/ninja.schema';
import { AuthGuard } from '@nestjs/passport';
// import { NinjaEntity } from './schemas/ninja.schema';
@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaservice:NinjasService){}

    @Get()
    async getNinjas(
        
        @Query('page') 
        page=1,
        @Query('limit') 
        limit=1,
        @Query('weapon') weapon:'stars'|'Nunchucks') :Promise <Ninja []>  {
        return this.ninjaservice.getNinjas(weapon)
    }




    @Get(':id')
    getOneNinga(@Param('id') id:string){
        
        return this.ninjaservice.getOneNinja(id)
      
    }


    @Post()

    // @UseGuards(AuthGuard)
    CreateNinja(@Body(new ValidationPipe()) CreateNinjaDto:CreateNinjaDto):Promise <Ninja> {
        
        return this.ninjaservice.CreateNinja(CreateNinjaDto)
    }


    @Put(':id')
    UpdateNinja(@Param('id') id:string , @Body() UpdateNinjaDto:UpdateNinjaDto){
        return this.ninjaservice.UpdateNinja(id,UpdateNinjaDto)
    }

    @Delete(':id')
    DeleteNinja(@Param('id') id:string){
        return this.ninjaservice.DeleteNinja(id)
    }
}
