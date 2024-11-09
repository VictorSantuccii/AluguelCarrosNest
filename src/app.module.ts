import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TestController } from './test.controller';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,

  ],
  controllers: [TestController],
  providers: [UserService],
})
export class AppModule {}
