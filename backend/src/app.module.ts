import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // LoggerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
