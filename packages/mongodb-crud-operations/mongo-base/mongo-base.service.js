"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBaseService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let MongoBaseService = class MongoBaseService {
    constructor(mongoService) {
        this.mongoService = mongoService;
    }
    async insert(entityLog) {
        try {
            let data = await this.mongoService.connect();
            console.log(JSON.stringify(data));
            let response = await this.mongoService.send("add", entityLog).toPromise();
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async update(entityLog) {
        let response = await this.mongoService.send("update", entityLog).toPromise();
        return response;
    }
    async delete(entityLog) {
        let response = await this.mongoService.send("delete", entityLog).toPromise();
        return response;
    }
    async findOne(entityLog) {
        let response = await this.mongoService.send("findOne", entityLog).toPromise();
        return response;
    }
    async findMany(entityLog) {
        let response = await this.mongoService.send("findMany", entityLog).toPromise();
        return response;
    }
    async findByKeyValue(entityLog) {
        let response = await this.mongoService.send("findByKeyValue", entityLog).toPromise();
        return response;
    }
    async findByKeyValueMany(entityLog) {
        let response = await this.mongoService.send("findByKeyValueMany", entityLog).toPromise();
        return response;
    }
    async deleteMany(entityLog) {
        let response = await this.mongoService.send("deleteMany", entityLog).toPromise();
        return response;
    }
    async updateMany(entityLog) {
        let response = await this.mongoService.send("updateMany", entityLog).toPromise();
        return response;
    }
    async filterByLocation(entityLog) {
        let response = await this.mongoService.send("filterByLocation", entityLog).toPromise();
        return response;
    }
    async filter(entityLog) {
        let response = await this.mongoService.send("filter", entityLog).toPromise();
        return response;
    }
    async locationIndex(data) {
        let response = await this.mongoService.send("locationIndex", data).toPromise();
        return response;
    }
    async aggregation(data) {
        let response = await this.mongoService.send("aggregation", data).toPromise();
        return response;
    }
    async count(data) {
        let response = await this.mongoService.send("count", data).toPromise();
        return response;
    }
    async bulkOperations(data) {
        let response = await this.mongoService.send("bulkoperations", data).toPromise();
        return response;
    }
    async bulkInserts(data) {
        let response = await this.mongoService.send("bulkinsert", data).toPromise();
        return response;
    }
};
MongoBaseService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject("mongo-service")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], MongoBaseService);
exports.MongoBaseService = MongoBaseService;
//# sourceMappingURL=mongo-base.service.js.map