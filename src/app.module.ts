import { ProductsModule } from "./modules/products/products.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userModule } from "src/modules/users/users.module";

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      "mongodb+srv://admin:123@thedatapi.dackkg6.mongodb.net/NestJS?retryWrites=true&w=majority&appName=TheDatAPI",
    ),
    userModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
