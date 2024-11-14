import { IsString } from "class-validator";

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    email: string;


    @IsString()
    phone: string;


    @IsString()
    cpf: string;


    @IsString()
    password: string;



}