import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  
  @Get()
  @UseGuards(JwtAuthGuard)  
  getProtectedRoute() {
    return { message: 'Você está autenticado e pode acessar esta rota!' };
  }
}
