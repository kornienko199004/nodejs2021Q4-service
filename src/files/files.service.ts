import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { File } from './entities/file.entity';
import { SaveFileDto } from './odt/save-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>
  ) {}

  /**
   * Save new file
   * @param fileDto payload for new file creation
   * @returns Promise<void>
   */
  async saveFile(fileDto: SaveFileDto): Promise<void> {
    const file = this.filesRepository.create(fileDto);
    await this.filesRepository.save(file);
  }

  /**
   * Returns file by id
   * @param id file id
   * @returns Promise<File | undefined>
   */
  findOne(id: string): Promise<File | undefined> {
    return this.filesRepository.findOne(id);
  }
}
