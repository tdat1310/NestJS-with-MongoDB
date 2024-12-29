/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/modules/products/dto/CreateProduct.dto';
import { CreateUserDto } from 'src/modules/users/dto/CreateUser.dto';
import { Product } from 'src/schemas/Product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
    createProduct(createProductDto : CreateProductDto) {
        const newProduct = new this.productModel(createProductDto)
        return newProduct.save()
    }
}
