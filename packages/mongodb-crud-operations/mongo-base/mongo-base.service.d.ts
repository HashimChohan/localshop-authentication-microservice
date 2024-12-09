import { ClientProxy } from '@nestjs/microservices';
import { AggregationModel } from './models/aggregation.model';
import { BulkInsertModel } from './models/bulkinsert.model';
import { BulkOperationsModel } from './models/bulkoperations.model';
import { EntityLogModel } from './models/entity-log.model';
import { FindDataModel } from './models/find-data.model';
export declare class MongoBaseService {
    private readonly mongoService;
    constructor(mongoService: ClientProxy);
    insert(entityLog: EntityLogModel): Promise<any>;
    update(entityLog: EntityLogModel): Promise<any>;
    delete(entityLog: EntityLogModel): Promise<any>;
    findOne(entityLog: FindDataModel): Promise<any>;
    findMany(entityLog: FindDataModel): Promise<any>;
    findByKeyValue(entityLog: FindDataModel): Promise<any>;
    findByKeyValueMany(entityLog: FindDataModel): Promise<any>;
    deleteMany(entityLog: FindDataModel): Promise<any>;
    updateMany(entityLog: EntityLogModel): Promise<any>;
    filterByLocation(entityLog: FindDataModel): Promise<any>;
    filter(entityLog: FindDataModel): Promise<any>;
    locationIndex(data: FindDataModel): Promise<any>;
    aggregation(data: AggregationModel): Promise<any>;
    count(data: FindDataModel): Promise<any>;
    bulkOperations(data: BulkOperationsModel): Promise<any>;
    bulkInserts(data: BulkInsertModel): Promise<any>;
}
//# sourceMappingURL=mongo-base.service.d.ts.map