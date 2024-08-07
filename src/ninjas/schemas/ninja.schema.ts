// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type NinjaDocument = Ninja & Document;

@Schema({
    timestamps:true
})
export class Ninja {

    // // @PrimaryGeneratedColumn('uuid')
    // id: number;

    
    @Prop()
    name: string;

    @Prop()
    weapon:string
    
    // // @Column({unique: true})
    // email: string;
    
    // // @Column()
    // password: string;
}

export const NinjaSchema=SchemaFactory.createForClass(Ninja)