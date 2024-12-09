import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { UtilService } from 'src/util/util.service';
import { RawFile } from './models/raw-file.model';
import { MongoBaseService, Operation } from 'mongodb-crud-operations';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadFileDTO } from './models/upload-file.dto';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class FileService {

  constructor(
    private readonly _utilService: UtilService,
    private readonly _mongoService: MongoBaseService,
    private readonly _firebaseService: FirebaseService
  ) { }

  // public async uploadFile(uploadFileDTO: UploadFileDTO): Promise<any> {
  //   let response = null;
  //   let baseDirectory = __dirname.replace("\\upload", '');
  //   if (await this.makeDirectory(baseDirectory)) {
  //     let filePath = baseDirectory + `\\images\\${uploadFileDTO.file.originalname}`;
  //     if (await this.copyFile(filePath, uploadFileDTO.file)) {
  //       let url = await this.resolveUrl(filePath, uploadFileDTO.file);
  //       await this.deleteFile(filePath);
  //       if (url) {
  //         return await this.storeRawFile(uploadFileDTO.file, url, uploadFileDTO.refId)
  //       }
  //     }
  //   }
  //   return response;
  // }

  // async storeRawFile(file: any, url: string, refId: string) {
  //   let res = { ref: "", refId: refId, url: url, type: file.mimetype.split('/')[0] };
  //   let rawFile: RawFile = new RawFile(uuidv4());
  //   rawFile.encoding = file.encoding;
  //   rawFile.fieldname = file.fieldname;
  //   rawFile.mimetype = file.mimetype;
  //   rawFile.originalname = file.originalname;
  //   rawFile.size = file.size;
  //   rawFile.sizeInWords = this._utilService.calculateBytes(file.size);
  //   rawFile.url = url;
  //   rawFile.refId = refId;
  //   res.ref = rawFile._id;
  //   this.addThumbUrl(rawFile);
  //   res.url = rawFile.thumbUrl;
  //   await this.addRawFileToDB(rawFile);
  //   return res;
  // }

  // async addThumbUrl(rawFile: RawFile) {
  //   let extension = rawFile.originalname.slice(rawFile.originalname.lastIndexOf(".") + 1).toLowerCase();
  // }

  // private async addRawFileToDB(rawFile: RawFile) {
  //   let entityLog = this._utilService.getEntityLog(rawFile, process.env.DATABASE_NAME, "raw_files", Operation.Create, "", "");
  //   await this._mongoService.insert(entityLog);
  // }


  // private async resolveUrl(filePath: any, file: any): Promise<string> {
  //   return new Promise(async (resolve, reject) => {
  //     let url = await this._firebaseService.uploadToFirebase(filePath, file,file.type);
  //     if (url) {
  //       resolve(url);
  //     } else {
  //       reject("");
  //     }
  //   });
  // }
  // private async makeDirectory(baseDirectory: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       fs.mkdir(baseDirectory + `\\images\\`, () => {
  //         resolve(true);
  //       });
  //     } catch (ex) {
  //       reject(false);
  //     }

  //   });
  // }

  // private async copyFile(filePath: string, file: any): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     if (typeof Buffer.from === "function") {
  //       fs.writeFile(filePath, Buffer.from(file.buffer), () => {
  //         resolve(true);
  //       });
  //     } else {
  //       reject(false);
  //     }
  //   });
  // }

  // private async deleteFile(filepath: string) {

  //   return new Promise((resolve, reject) => {
  //     try {
  //       fs.unlinkSync(filepath);
  //       resolve(true);
  //     } catch (ex) {
  //       reject(false);
  //     }

  //   });
  // }

}
