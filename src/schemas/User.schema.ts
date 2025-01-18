import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/schemas/Product.schema";

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;


  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    default: [],
  })
  purchasedProducts?: Product[];
}

export const userSchema = SchemaFactory.createForClass(User);
