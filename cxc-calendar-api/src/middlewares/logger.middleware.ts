import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Fecha
    const date = new Date().toLocaleString();

    //Direccion url
    const protocol = req.protocol;
    const host = req.get('host');
    const originalUrl = req.originalUrl;
    const fullUrl = `${protocol}://${host}${originalUrl}`;

    //Logger
    console.log(`${req.method} to: ${fullUrl} Date: ${date}`);

    next();
  }
}