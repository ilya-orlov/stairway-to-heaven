import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: config.get<any>('TYPEORM_CONNECTION', 'postgres'),
        host: config.get<string>('TYPEORM_HOST', 'localhost'),
        username: config.get<string>('TYPEORM_USERNAME', 'admin'),
        password: config.get<string>('TYPEORM_PASSWORD', 'admin'),
        database: config.get<string>('TYPEORM_DATABASE', 'sth-db'),
        port: config.get<number>('TYPEORM_PORT', 5432),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
