import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createBoardDto: LoginDto): Promise<{ token: string }> {
    const token = await this.authService.getToken(createBoardDto);
    if (!token) {
      throw new ForbiddenException();
    }
    return { token };
  }
}
