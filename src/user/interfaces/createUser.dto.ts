import { IsString, IsEmail, IsEnum, IsPhoneNumber, IsOptional, Length, Matches } from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class CreateUserDto {

  @IsString()
  @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  phone: string;

  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  cpf: string;

  @IsString()
  @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'O papel do usuário deve ser "admin" ou "user"' })
  role?: UserRole;
}
