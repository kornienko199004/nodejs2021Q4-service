import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { FilesService } from './files.service';
import { editFileName } from './helpers';
import { File as FileOdt } from './odt/file.odt';
import { File } from './entities/file.entity';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fieldSize: 20 },
    storage: diskStorage({
      destination: './uploads/',
      filename: editFileName,
    })
  }))
  async uploadFile(@UploadedFile() file: FileOdt, @Param('fileId') fileId: string): Promise<{ originalName: string; id: string }> {
    const response = {
      originalName: file.originalname,
      id: fileId,
    };
    await this.filesService.saveFile({ id: fileId, fileName: file.filename });
    return response;
  }

  @Get(':id')
  async getFile(@Param('id') fileId: string, @Res() res: Response): Promise<unknown> {
    const file: File | undefined = await this.filesService.findOne(fileId);

    if (!file) {
      throw new NotFoundException();
    }
    return res.sendFile(file.fileName, { root: './uploads' });
  }
}
