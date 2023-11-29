<<<<<<< HEAD
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { addUsersDTO, updateUsersDTO } from './user.dto';
=======
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
>>>>>>> development

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  async handleGetAllUsers(@Req() req) {
    const users = await this.userService.getAllUsers();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all users',
      users
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async handleGetProfile(@Req() req) {
    const user = req.user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User details fetched successfully.',
      user
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async handleAddUser(@Body() request: addUsersDTO) {
    return this.userService.addUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async handleUpdate(@Param('id') id: string, @Body() request: updateUsersDTO) {
    return this.userService.updateUser(id, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async handleDelete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
