/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UsePipes,
    ValidationPipe, } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/products/dto/CreateProduct.dto';
import { ProductsService } from 'src/modules/products/products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() createProductDto : CreateProductDto){
   
        return this.productService.createProduct(createProductDto)
    }
    
}
