import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // lưu ý, thuộc tính name của User.name không liên quan, k bắt buộc Schema phải có name
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
