import { Injectable } from '@nestjs/common';
import { checkPassword } from '../helpers/hashHelper';
import { TokenHelper } from '../helpers/token.helper';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Creates new board
   * @param value payload for new board creation
   * @returns Promise<Board>
   */
  async getToken(value: LoginDto): Promise<string | null> {
    const user: User | null = await this.usersService.findOneByLogin(value.login);
  
    if (user) {
      const passwordsEqual = await checkPassword(value.password, user.password);
      if (passwordsEqual) {
        return TokenHelper.generateToken(user.id, user.login);
      }
    }
  
    return null;
  }
}
