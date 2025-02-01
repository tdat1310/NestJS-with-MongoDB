import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "src/helpers/utils";
import { CreateAuthDto } from "src/modules/auth/dto/CreateAuth.dto";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);
    const isValidPassword = comparePassword(pass, user.password);
    console.log(username, pass);
    if (!user || !isValidPassword) return null;
    return user;
  }
  async login(user: any) {
    // console.log(user)
    const payload = { username: user.userName, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return this.usersService.createUser(registerDto);
  }
}
