//-------------------------------------------------//
//--------------------Librerias--------------------//
import { NestFactory } from '@nestjs/core';

//-------------------------------------------------//
//---------------------Modulos---------------------//
import { AppModule } from './app.module.js';

//-------------------------------------------------//
//--------------------Variables--------------------//
import { PORT } from './config/envs.js'

//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(PORT ?? 3000);

  console.log(`Server listening on port: ${PORT ?? 3000}`);
}
await bootstrap();
