import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export async function validateEmailUnique(
  email: string,
  userRepository: Repository<UserEntity>,
): Promise<void> {
  const existingUser = await userRepository.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new BadGatewayException('Email já registrado dentro do sistema.');
  }
}


export async function validateCpfUnique(
  cpf: string,
  userRepository: Repository<UserEntity>,
): Promise<void> {
  const existingUser = await userRepository.findOne({
    where: { cpf },
  });

  if (existingUser) {
    throw new BadGatewayException('CPF já registrado dentro do sistema.');
  }
}


export async function validatePhoneUnique(
  phone: string,
  userRepository: Repository<UserEntity>,
): Promise<void> {
  const existingUser = await userRepository.findOne({
    where: { phone },
  });

  if (existingUser) {
    throw new BadGatewayException('Telefone já registrado dentro do sistema.');
  }
}


export function validatePhoneFormat(phone: string): void {
  const phonePattern = /^[0-9]{11}$/;
  if (!phonePattern.test(phone)) {
    throw new BadGatewayException('O telefone deve ter 11 dígitos e conter apenas números.');
  }
}


export function validateEmailFormat(email: string): void {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    throw new BadGatewayException('O email deve ser válido e estar no formato correto.');
  }
}
