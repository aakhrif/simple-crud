import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  index(): Promise<User[]> {
    console.log('users endpoint ');
    return this.userService.findAll();
  }

  @Post('/create')
  async create(@Res() res, @Body() user: CreateUserDto) {
    console.log('create user endpoint ', user);
    try {
      await this.userService.create(user);
      return res.status(HttpStatus.OK).json({
        message: 'User Inserted successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
}
