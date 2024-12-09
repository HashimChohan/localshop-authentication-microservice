import { Injectable } from '@nestjs/common';
import { MongoBaseService, Operation } from 'mongodb-crud-operations';
import { CollectionNames } from 'src/environment';
import { ResponseModel } from 'src/response.model';
import { UtilService } from 'src/util/util.service';
import { System } from './entities/system.entity';

@Injectable()
export class SystemService {
  systemId = "SysJSON";

  constructor(private util: UtilService, private mongo: MongoBaseService) { }

  // async modifyJSON(system: System[]) {
  //   try {
  //     let entityModel  = this.util.getEntityLog({ _id: this.systemId, system: system }, process.env.DATABASE_NAME, CollectionNames.System, Operation.Update, "", "", this.systemId);
  //     return new ResponseModel(true, await this.mongo.update(entityModel), "Chart Added");
  //   } catch (e) {
  //     return this.util.getResponseObject(false, e.message, e);
  //   }
  // }

  // async findJSON() {
  //   try {
  //     let findModel = this.util.getfindDataModelId(process.env.DATABASE_NAME, CollectionNames.System, this.systemId);
  //     let system = await this.mongo.findOne(findModel);
  //     console.log("sytem =====================>",system);
  //     if (!system) {
  //       system = {system: System.SystemJSON};
  //     console.log("sytemmmmmm =====================>",system);

  //     }
  //     return new ResponseModel(true, system, "Success");
  //   } catch (e) {
  //     console.log("catch =====================>",e);

  //     return this.util.getResponseObject(false, e.message, e);
  //   }
  // }

}
