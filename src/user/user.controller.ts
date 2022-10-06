import { Body, Controller, ExceptionFilter, Get, HttpException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserSignupData, UserSigninData } from './dto/index.dto'
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService) {}

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number):Promise<User> {
        return this.userService.getUser(id)
    }

    @Post('signup')
    signup(@Body() userSignupDto:UserSignupData):Promise<UserSignupData> {
        return this.userService.signup(userSignupDto)
    }

    @Post('signin')
    signin(@Body() userSigninDto:UserSigninData):Promise<User | HttpException> {
        return this.userService.signin(userSigninDto)
    }

    @Post('delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id:number):string {
        return this.userService.deleteUser(id)
    }
}
