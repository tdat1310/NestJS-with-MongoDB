import { ProductsModule } from "./modules/products/products.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { AuthModule } from "src/modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/modules/auth/passport/jwt-auth.guard";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      inject: [ConfigService], // Inject ConfigService để lấy giá trị cấu hình
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URL"), // Lấy URL MongoDB từ biến môi trường
      }),
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Để ConfigModule khả dụng toàn cục
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      inject: [ConfigService], // Inject ConfigService để lấy giá trị cấu hình
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>("MAIL_USER"),
            pass: configService.get<string>("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + "/src/mail/templates/",
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
