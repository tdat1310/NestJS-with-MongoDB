import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "src/modules/users/dto/CreateUser.dto";
import { UpdateUserDto } from "src/modules/users/dto/UpdateUser.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate("purchasedProducts");;
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate("purchasedProducts");;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async purchaseProduct(userId: string, productId: string) {
    // Chỉ cập nhật danh sách sản phẩm đã mua mà không kiểm tra tồn tại
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { purchasedProducts: productId } },
      { new: true }
    );
  }
}
