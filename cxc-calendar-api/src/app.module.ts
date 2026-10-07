//-------------------------------------------------//
//--------------------Librerias--------------------//
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

//-------------------------------------------------//
//----------Controladores y Proveedores------------//
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
