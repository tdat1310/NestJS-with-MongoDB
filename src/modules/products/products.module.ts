import { ProductsController } from "src/modules/products/products.controller";
import { ProductsService } from "./products.service";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, productSchema } from "src/schemas/Product.schema";

@Module({
  imports: [MongooseModule.forFeature([{
    name: Product.name,
    schema: productSchema
  }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
