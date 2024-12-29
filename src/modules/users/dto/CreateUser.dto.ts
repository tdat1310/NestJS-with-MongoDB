import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsNumber()
    age : number;
}