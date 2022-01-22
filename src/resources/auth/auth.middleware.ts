import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthError } from "../../common/authError";
import { WHITE_LIST_PATH } from "../../common/config";
import { TokenHelper } from "../../helpers/token.helper";

export class AuthMiddleware {
  public static checkToken(req: Request, res: Response, next: () => unknown): void {
    if (WHITE_LIST_PATH.includes(req.path)) {
      next();
      return;
    }

    try {
      const token = TokenHelper.getToken(req?.headers?.authorization);
      if (!TokenHelper.checkToken(token)) {
        throw new AuthError();
      }
      next();
    } catch(e) {
      res.status(StatusCodes.UNAUTHORIZED).send();
    }
  }
}