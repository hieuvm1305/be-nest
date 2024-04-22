import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  avatar: string;
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;
}
