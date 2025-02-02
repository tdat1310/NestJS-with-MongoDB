/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/decorator/customize";
import { AuthService } from "src/modules/auth/auth.service";
import { CreateAuthDto } from "src/modules/auth/dto/CreateAuth.dto";
import { JwtAuthGuard } from "src/modules/auth/passport/jwt-auth.guard";
import { LocalAuthGuard } from "src/modules/auth/passport/local-auth.guard";
import { MailerService } from "@nestjs-modules/mailer";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @Public()
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post("register")
  @Public()
  handleRegister(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Get("mail")
  @Public()
  test() {
    this.mailerService
    .sendMail({
      to: 'cutip59@gmail.com', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
    return "send email successfully";
  }
}
