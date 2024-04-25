import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoDto } from './dto/user_info.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashPw = bcrypt.hash(createUserDto.password, 10);
    const data = { ...createUserDto, createdAt: new Date(), password: hashPw };

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updatedUser = await this.userModel.findOneAndUpdate(
      { uid: id },
      updateUserDto,
    );
    if (!updatedUser) throw new NotFoundException('not found user');

    updatedUser = await this.userModel.findOne({ uid: id });

    return plainToClass(UserInfoDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { uid: id },
      { is_inActive: true },
    );
    if (!updatedUser) throw new NotFoundException('not found user');

    return { message: 'dellete successfully' };
  }
}
