import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenHelper } from '../helpers/token.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  // eslint-disable-next-line class-methods-use-this
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = TokenHelper.getToken(context.switchToHttp().getRequest().headers.authorization);
        if (!TokenHelper.checkToken(token)) {
          throw new UnauthorizedException();
        }
        return true;
    } catch(e) {
      throw new UnauthorizedException();
    }
  }
}
