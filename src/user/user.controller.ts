import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './interfaces/returnUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map(
            (userEntity) => new ReturnUserDto(userEntity),
        );
    }

    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<ReturnUserDto> {
        const user = await this.userService.findUserById(id);
       
        return new ReturnUserDto(user);
    }

    @Get('email/:email')
    async findUserByEmail(@Param('email') email: string): Promise<ReturnUserDto> {
        const user = await this.userService.findUserByEmail(email);
       
        return new ReturnUserDto(user);
    }
}
