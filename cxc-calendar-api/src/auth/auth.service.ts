import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';


@Injectable()
export class AuthService {
async login (credential: LoginDto){
  return "Acceso Correcto"
}
}
