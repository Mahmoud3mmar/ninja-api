import {MinLength,IsEnum} from 'class-validator'
export class CreateNinjaDto {


    @MinLength(3)
    name: string


    @IsEnum(['stars','Nunchucks'],{message:'use correct weapon'})
    weapon:string
}
