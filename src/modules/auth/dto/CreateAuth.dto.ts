import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
