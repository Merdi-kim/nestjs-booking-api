import {IsEmail, MinLength, IsNumber} from 'class-validator'

export class HotelDto {
    @MinLength(3)
    name:string

    @IsEmail()
    owner:string 

    @IsNumber()
    price:number 
}