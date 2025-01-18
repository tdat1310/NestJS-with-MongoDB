import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "src/modules/users/dto/CreateUser.dto";
import { UpdateUserDto } from "src/modules/users/dto/UpdateUser.dto";
import { hashPassword } from "src/helpers/utils";
import aqp from "api-query-params";
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string) => {
    const isExist = await this.userModel.exists({ email });
    console.log(isExist);
    if (isExist) return true;
    return false;
  };

  async createUser(createUserDto: CreateUserDto) {
    const { userName, password, email } = createUserDto;
    // check email
    const isExist = await this.isEmailExist(email);
    if (isExist === true) throw new BadRequestException("Email đã tồn tại");
    // Hash mật khẩu
    const hashPwd = await hashPassword(password);
    // Tạo người dùng mới
    const newUser = new this.userModel({
      userName,
      password: hashPwd,
      email,
    });
    // Lưu người dùng mới và trả về chỉ ID
    const savedUser = await newUser.save();
    return { id: savedUser._id }; // Trả về ID của người dùng
  }

  async getUsers(query: string, current : number, pageSize : number) {
    const { filter, sort } = aqp(query);
    if(filter.current) delete filter.current
    if(filter.pageSize) delete filter.pageSize
    if(!current) current = 1
    if(!pageSize) pageSize = 10

    const totalItems = ((await this.userModel.find(filter)).length)
    const totalPages = Math.ceil(totalItems/pageSize);
    const skip = (current - 1) * pageSize

    const result = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .sort(sort as any)
    .select("-password")
    .populate("purchasedProducts")
    return {result, totalPages};
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate("purchasedProducts");
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
      { new: true },
    );
  }
}
