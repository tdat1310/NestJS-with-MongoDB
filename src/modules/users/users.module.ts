import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "src/schemas/User.schema";
import { UsersController } from "src/modules/users/users.controller";
import { UsersService } from "src/modules/users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class userModule {}
