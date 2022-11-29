import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  SetMetadata,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  async create(@Res() res, @Body() user: CreateUserDto) {
    console.log('create user endpoint ', user);
    try {
      await this.userService.create(user);
      if (res.status(HttpStatus.OK))
        return { message: 'User Inserted successfully!', status: 200 }
    } catch (err) {
      if (res.status(HttpStatus.BAD_REQUEST))
        return { message: 'Error: User not updated!', status: 400 };
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.userService.remove(params.id);
  }
}
