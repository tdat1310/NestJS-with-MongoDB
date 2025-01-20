
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

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);
    const isValidPassword = comparePassword(pass, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
