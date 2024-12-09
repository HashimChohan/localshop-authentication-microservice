import { Module } from '@nestjs/common';
import { MongoBaseModule } from 'mongodb-crud-operations';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UtilModule } from 'src/util/util.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
  imports : [UtilModule,MongoBaseModule,FirebaseModule]
})
export class FileModule {}
