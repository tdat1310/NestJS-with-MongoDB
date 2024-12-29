import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {

  @Prop({ required: true })
  productName: string;  // Tên sản phẩm

  @Prop({ required: true })
  description: string;  // Mô tả sản phẩm

  @Prop({ required: true })
  price: number;  // Giá sản phẩm

}

export const productSchema = SchemaFactory.createForClass(Product);
