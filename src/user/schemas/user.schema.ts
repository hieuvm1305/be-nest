import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @IsNotEmpty()
  username: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  avatar: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  is_superuser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
