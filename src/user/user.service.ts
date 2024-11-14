import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    validateEmailFormat,
    validateCpfUnique,
    validateEmailUnique,
    validatePhoneFormat,
    validatePhoneUnique,
    validateEmailExists,
    validateUserExists,
} from './validations/user-validation.utils';
import { UpdateUserDto } from './interfaces/updateUser.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined)

        await validateEmailUnique(createUserDto.email, this.userRepository);
        await validateCpfUnique(createUserDto.cpf, this.userRepository);
        await validatePhoneUnique(createUserDto.phone, this.userRepository);
        validatePhoneFormat(createUserDto.phone);
        validateEmailFormat(createUserDto.email);

        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
        });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException(`Usuário ${userId} não existe.`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        await validateEmailExists(email, this.userRepository);
    
        return this.userRepository.findOne({
            where: { email },
        });
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findUserById(userId);
    
        
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            await validateEmailUnique(updateUserDto.email, this.userRepository);
            validateEmailFormat(updateUserDto.email);
        }
    
       
        if (updateUserDto.cpf && updateUserDto.cpf !== user.cpf) {
            await validateCpfUnique(updateUserDto.cpf, this.userRepository);
        }
    
        
        if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
            await validatePhoneUnique(updateUserDto.phone, this.userRepository);
            validatePhoneFormat(updateUserDto.phone);
        }
    
       
        if (updateUserDto.password && updateUserDto.password !== user.password) {
            const saltOrRounds = 10;
       
            updateUserDto.password = await hash(updateUserDto.password, saltOrRounds);
        } else {
           
            updateUserDto.password = user.password;
        }
    
        
        Object.assign(user, updateUserDto);
    
        return this.userRepository.save(user);
    }
    
    async deleteUser(userId: number): Promise<void> {
        const user = await validateUserExists(userId, this.userRepository);

        await validateEmailExists(user.email, this.userRepository);

        await this.userRepository.remove(user);
    }
}
