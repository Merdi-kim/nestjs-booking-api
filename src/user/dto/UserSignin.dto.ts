import {
  IsEmail,
  MinLength,
} from 'class-validator';

export class UserSigninData {
  @IsEmail()
  email: string;

  @MinLength(5, {
    message: 'Increase the damn length',
  })
  password: string;
}
