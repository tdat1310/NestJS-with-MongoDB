import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}
