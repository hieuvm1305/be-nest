// data tranfer object
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  age: number;
  phone: string;
  avatar: string;
  createdAt: Date;
}
