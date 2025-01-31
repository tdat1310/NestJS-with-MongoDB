
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/utils';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);
    const isValidPassword = comparePassword(pass, user.password)

    if(!user || !isValidPassword) return null
    return user
    // const payload = { sub: user._id, username: user.userName };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
  async login(user: any) {
    const payload = { username: user.userName, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
