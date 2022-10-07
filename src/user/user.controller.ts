import {
  Body,
  Catch,
  Controller,
  Delete,
  ExceptionFilter,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  UserSignupData,
  UserSigninData,
} from './dto/index.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post('signup')
  signup(
    @Body() userSignupDto: UserSignupData,
  ): Promise<UserSignupData> {
    return this.userService.signup(userSignupDto);
  }

  @Post('signin')
  signin(
    @Body() userSigninDto: UserSigninData,
  ): Promise<User> {
    return this.userService.signin(userSigninDto);
  }

  @Delete('delete')
  deleteUser(
    @Body('email') email: string,
  ): Promise<string> {
    return this.userService.deleteUser(email);
  }
}
