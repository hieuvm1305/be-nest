import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  @IsEmail()
  email: string;

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

  @Prop({ default: false })
  is_inActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
