import { Request } from "express";
import { extname } from "path";
import { v4 } from "uuid";
import { File } from "../odt/file.odt";

export const editFileName = (req: Request, file: File, callback: (error: Error | null, filename: string) => void): void => {
  const fileExtName = extname(file.originalname);
  const fileId = v4();
  req.params.fileId = fileId;
  callback(null, `${fileId}${fileExtName}`);
};