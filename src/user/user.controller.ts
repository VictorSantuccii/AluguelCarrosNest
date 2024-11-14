import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreateUserDto } from './interfaces/createUser.dto';
  import { UpdateUserDto } from './interfaces/updateUser.dto';
  import { UserService } from './user.service';
  import { UserEntity } from './entities/user.entity';
  import { ReturnUserDto } from './interfaces/returnUser.dto';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<{ message: string; }> {
      const user = await this.userService.createUser(createUser);
      const message = 'Usuário criado com sucesso!';
      return { message };
    }
  
    @Get()
    async getAllUsers(): Promise<{ users: ReturnUserDto[] }> {
      const users = await this.userService.getAllUsers();
      return { users: users.map(user => new ReturnUserDto(user)) };
    }
  
    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<{ user: ReturnUserDto }> {
      const user = await this.userService.findUserById(id);
      return { user: new ReturnUserDto(user) }
    }
  
    @Get('email/:email')
    async findUserByEmail(@Param('email') email: string): Promise<{ user: ReturnUserDto }> {
      const user = await this.userService.findUserByEmail(email);
      return { user: new ReturnUserDto(user) };
    }
  
    @UsePipes(ValidationPipe)
    @Patch(':id')
    async updateUser(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<{ message: string; }> {
      const user = await this.userService.updateUser(id, updateUserDto);
      const message = `Usuário com ID ${id} atualizado com sucesso!`;
      return { message };
    }
  
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
      await this.userService.deleteUser(id);
      const message = `Usuário com ID ${id} foi deletado com sucesso!`;
      return { message };
    }
  }
  