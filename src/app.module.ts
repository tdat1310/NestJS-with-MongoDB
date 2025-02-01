import { ProductsModule } from "./modules/products/products.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { AuthModule } from "src/modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/modules/auth/passport/jwt-auth.guard";

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      inject: [ConfigService], // Inject ConfigService để lấy giá trị cấu hình
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URL"), // Lấy URL MongoDB từ biến môi trường
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Để ConfigModule khả dụng toàn cục
    }),
  ],
  controllers: [],
  providers: [ {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
