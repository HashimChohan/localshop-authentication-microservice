import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileService } from './file.service';
import { UploadFileDTO } from './models/upload-file.dto';

@Controller()
export class FileController {
  constructor(
    @Inject('FileService') private readonly fileService: FileService,
  ) {}

  // @MessagePattern({cmd: 'uploadFile'})
  // public async uploadFile(data: UploadFileDTO) {
  //   return await this.fileService.uploadFile(data);
  // }
}
