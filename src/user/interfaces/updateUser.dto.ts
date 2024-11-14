import { IsOptional, IsString, IsEmail, IsNotEmpty, Length, Matches, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'E-mail inválido' })
    email?: string;

    @IsOptional()
    @IsString()
    @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
    @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
    cpf?: string;

    @IsOptional()
    @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
    phone?: string;

    @IsOptional()
    @IsString()
    @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial' })
    password?: string;
}
