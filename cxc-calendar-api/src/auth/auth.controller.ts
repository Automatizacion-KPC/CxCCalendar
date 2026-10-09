import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //---------------------------------------//
  @ApiOperation({
    summary: 'Iniciar sesión.',
    description: 'Inicia sesión para usuarios activos y devuelve un accesToken.',
  })
  @ApiResponse({ status: 200, description: 'Inicio exitoso.' })
  @Post()
  singIn(@Body() credential: LoginDto) {
    return this.authService.singIn(credential);
  }
}
