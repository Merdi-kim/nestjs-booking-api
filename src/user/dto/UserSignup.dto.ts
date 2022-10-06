import {IsEmail, MinLength} from 'class-validator'

export class UserSignupData {
    @IsEmail()
    email:string;

    @MinLength(3)
    username:string;

    @MinLength(5)
    password:string
}