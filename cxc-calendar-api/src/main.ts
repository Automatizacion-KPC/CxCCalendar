//-------------------------------------------------//
//--------------------Librerias--------------------//
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//-------------------------------------------------//
//---------------------Modulos---------------------//
import { AppModule } from './app.module.js';

//-------------------------------------------------//
//--------------------Variables--------------------//
import { PORT } from './config/envs.js';

//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //-----------------Global Pipes------------------//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, //Bloquea la solicitud si no pudo ignorar los datos extra
      transform: true, //Permite modificaciones de las solicitudes
    }),
  );

  //-------------------Swagger---------------------//
  const swaggerDoc = new DocumentBuilder()
    .setTitle('CxC-Calemdar-API')
    .setVersion('1.0.0')
    .setDescription('Calendario de CxC Koonol')
    .addBearerAuth()
    .build();

  const documentModule = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('docs', app, documentModule);

  //-------------------Puerto---------------------//
  await app.listen(PORT ?? 3000);

  console.log(`Server listening on port: ${PORT ?? 3000}`);
}
await bootstrap();
