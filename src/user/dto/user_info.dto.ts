import { Exclude, Expose } from 'class-transformer';

export class UserInfoDto {
  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;
  @Expose()
  age: number;
  @Expose()
  phone: string;
  @Expose()
  avatar: string;
  @Expose()
  createdAt: Date;
  @Expose()
  is_superuser: boolean;
}
