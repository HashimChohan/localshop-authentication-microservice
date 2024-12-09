import { Injectable } from '@nestjs/common';
import { EntityLogModel, Operation } from 'packages/mongodb-crud-operations/mongo-base/models/entity-log.model';
import { FindDataModel } from 'packages/mongodb-crud-operations/mongo-base/models/find-data.model';
import { ResponseModel } from 'src/response.model';

@Injectable()
export class UtilService {

    // public getfindDataModelQuery(dbName: string, entityName: string, query: any) {
    //     let findData = new FindDataModel();
    //     findData.dbName = dbName;
    //     findData.entityName = entityName;
    //     findData.query = query;
    //     return findData;
    // }

    // public getfindDataModelId(dbName: string, entityName: string, id: string) {
    //     let findData = new FindDataModel();
    //     findData.dbName = dbName;
    //     findData.entityName = entityName;
    //     findData.id = id;
    //     return findData;
    // }

    // public getEntityLog(data: any, dbName: string, entityName: string, operation: Operation, userId: string, userName: string, entityId?: string): EntityLogModel {
    //     let entityLog = new EntityLogModel();
    //     entityLog.date = new Date().toISOString();
    //     entityLog.dbName = dbName;
    //     entityLog.entityName = entityName;
    //     entityLog.fieldValues = this.resolveFields(data);
    //     entityLog.operation = operation;
    //     entityLog.userId = userId;
    //     entityLog.userName = userName;
    //     entityLog.entityId = entityId;

    //     return entityLog;
    // }

    // public resolveFields(data) {
    //     let objectKeys = Object.keys(data);
    //     let fieldValues = [];
    //     for (let key of objectKeys) {
    //         let tempData = {};
    //         tempData[key] = data[key];
    //         fieldValues.push(tempData);
    //     }
    //     return fieldValues;
    // }

    // public getResponseObject(isSuccess: boolean, message?: string, data?: any) {
    //     return new ResponseModel(isSuccess,data,message);
    // }
    

    // public calculateBytes(x) {
    //     const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    //     let l = 0, n = parseInt(x, 10) || 0;

    //     while (n >= 1024 && ++l) {
    //         n = n / 1024;
    //     }

    //     return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    // }
}
