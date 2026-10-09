//--------------------------------------------------//
//---------------------Librerias--------------------//
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

//--------------------------------------------------//
//--------------------Variables---------------------//
import { JWT_SECRET } from '../config/envs.js';
import { Role } from '../enums/rol.enum.js';

//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtener la request
    const request = context.switchToHttp().getRequest();

    //Obtener la autentificacion de los headers
    const auth = request.headers.authorization; //"Bearer token"

    //Realizar las validaciones
    if (!auth) {
      throw new UnauthorizedException(
        'No se posee la autorización para realizar la acción.',
      );
    }
    const token: string = auth.split(' ')[1]; // "token"
    if (!token) {
      throw new UnauthorizedException(
        'No se posee la autorización para realizar la acción.',
      );
    }

    const secret = JWT_SECRET;

    try {
      //{id, email, isAdmin}
      const payload = this.jwtService.verify(token, { secret });

      //{id, email, isAdmin}
      if (payload.isAdmin) {
        payload.roles = [Role.Admin];
      } else {
        payload.roles = [Role.User];
      }

      //Agregamos una propiedad user a la request
      request.user = payload;

      //Retorno true si se aprobaron las validaciones
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
