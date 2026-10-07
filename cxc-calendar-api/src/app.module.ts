//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

//-------------------------------------------------//
//----------Controladores y Proveedores------------//
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import typeorm from './config/typeorm.js';

//-------------------------------------------------//
//-----------------Middlewares---------------------//
import { LoggerMiddleware } from './middlewares/logger.middleware.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
