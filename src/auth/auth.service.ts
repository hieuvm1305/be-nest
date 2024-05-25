import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    // private jwtService: JwtService,
  ) {}

  async signIn(data: loginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Email is not exist');
    const comparePw = bcrypt.compare(data.password, user.password);
    if (!comparePw) throw new UnauthorizedException('password is in correct');
    this.logger.log(user);
    const data_log_in = {
      user: {},
      token: {},
      message: 'log in',
    };
    return data_log_in;
  }
}
