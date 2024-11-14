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
    validatePhoneUnique
}
    from './validations/user-validation.utils';

@Injectable()
export class UserService {

    constructor
        (
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

        })


    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }


    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException(`Usuário ${userId} não existe.`)
        }

        return user;

    }


    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} não existe.`)
        }

        return user;

    }
}