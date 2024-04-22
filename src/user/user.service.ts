import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoDto } from './dto/user_info.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const data = { createdAt: new Date(), ...createUserDto };
    const newUser = await this.userModel.create(data);
    return newUser;
  }

  async findAll(): Promise<UserInfoDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) =>
      plainToClass(UserInfoDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findUserById(id: string): Promise<UserInfoDto> {
    this.logger.log(id);
    const foundUser = await this.userModel.findById(id).exec();
    return plainToClass(UserInfoDto, foundUser, {
      excludeExtraneousValues: true,
    });
    // return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return updatedUser;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
