/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { CreateAuthDto } from "src/modules/auth/dto/CreateAuth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(
      createAuthDto.userName,
      createAuthDto.password,
    );
  }
}
