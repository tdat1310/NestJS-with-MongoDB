import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
