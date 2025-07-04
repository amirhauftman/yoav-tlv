import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { AuthService } from './user.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}