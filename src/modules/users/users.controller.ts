import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { query } from "express";
import mongoose from "mongoose";
import { CreateUserDto } from "src/modules/users/dto/CreateUser.dto";
import { UpdateUserDto } from "src/modules/users/dto/UpdateUser.dto";
import { UsersService } from "src/modules/users/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
   async getUser(
    @Query() query : string,
    @Query("current") current : string,
    @Query("pageSize") pageSize : string,
  ) {
    return this.usersService.getUsers(query, +current, +pageSize);
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException("id not valid", 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException("user not found", 404);

    return findUser;
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException("id not valid", 404);

    const updateUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updateUser) throw new HttpException("user not found", 404);

    return updateUser;
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException("id not valid", 404);

    const deleteUser = await this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException("user not found", 404);

    return deleteUser;
  }

  @Post(":userId/purchase/:productId")
  async purchaseProduct(
    @Param("userId") userId: string,
    @Param("productId") productId: string,
  ) {
    // Kiểm tra tính hợp lệ của ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      throw new HttpException("Invalid userId or productId", 404);
    }

    // Kiểm tra sự tồn tại của người dùng
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new HttpException("User not found", 404);

    // Logic xử lý mua sản phẩm
    return this.usersService.purchaseProduct(userId, productId);
  }
}
