import { JwtPayload, sign, verify } from "jsonwebtoken";
import { AuthError } from "../common/authError";
import { JWT_SECRET_KEY } from "../common/config";

export class TokenHelper {
  /**
   * Returns jwt token
   * @param userId user id
   * @param login user login
   * @returns token
   */
  public static generateToken(userId: string, login: string): string {
    return sign({ userId, login }, JWT_SECRET_KEY as string, { expiresIn: '1h' });
  }

  /**
   * Checks jwt token
   * @param token user token
   * @returns check result
   */
  public static checkToken(token: string): boolean {
    try {
      verify(token, JWT_SECRET_KEY as string);
      return true;
    } catch(e) {
      return false;
    }
  }

  /**
   * Checks jwt token
   * @param token user token
   * @returns check result
   */
  public static getToken(authHeader?: string): string {
    if (!authHeader) {
      throw new AuthError();
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new AuthError('Wrong type');
    }

    if (!token || token.length === 0) {
      throw new AuthError('Invalid token');
    }
    return token;
  }
}
