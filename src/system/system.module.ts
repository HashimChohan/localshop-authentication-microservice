import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { UtilModule } from 'src/util/util.module';
import { MongoBaseModule } from 'mongodb-crud-operations';

@Module({
  controllers: [SystemController],
  imports: [MongoBaseModule, UtilModule],
  providers: [SystemService]
})
export class SystemModule { }
