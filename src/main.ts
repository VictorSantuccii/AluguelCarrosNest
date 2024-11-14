import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 5000;

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`🚀 API iniciada com sucesso! Servidor rodando na porta ${port}.`);
}

bootstrap();
