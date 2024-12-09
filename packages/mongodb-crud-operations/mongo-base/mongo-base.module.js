"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBaseModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongo_base_service_1 = require("./mongo-base.service");
let MongoBaseModule = class MongoBaseModule {
};
MongoBaseModule = __decorate([
    common_1.Module({
        providers: [mongo_base_service_1.MongoBaseService, {
                provide: 'mongo-service',
                useFactory: () => {
                    return microservices_1.ClientProxyFactory.create({ transport: microservices_1.Transport.TCP, options: { host: 'host.docker.internal', port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : 6667 } });
                },
            }],
        exports: [mongo_base_service_1.MongoBaseService]
    })
], MongoBaseModule);
exports.MongoBaseModule = MongoBaseModule;
//# sourceMappingURL=mongo-base.module.js.map