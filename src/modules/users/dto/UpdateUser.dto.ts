import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UpdateUserDto {

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}
