import { UserModule } from "src/modules/users/users.module";

import { JwtModule } from "@nestjs/jwt";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "src/modules/auth/auth.controller";
import { AuthService } from "src/modules/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/modules/auth/passport/local.strategy";
import { JwtStrategy } from "src/modules/auth/passport/jwt.strategy";
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_ACCESS_TOKEN_EXPIRED"),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
