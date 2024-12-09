"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialmediaModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const socialmedia_service_1 = require("./socialmedia.service");
let SocialmediaModule = class SocialmediaModule {
};
SocialmediaModule = __decorate([
    (0, common_1.Module)({
        providers: [socialmedia_service_1.SocialmediaService,
            {
                provide: 'tcp-service',
                useFactory: () => {
                    return microservices_1.ClientProxyFactory.create({ transport: microservices_1.Transport.TCP, options: { host: 'host.docker.internal', port: 6668 } });
                },
            }],
        exports: [socialmedia_service_1.SocialmediaService]
    })
], SocialmediaModule);
exports.SocialmediaModule = SocialmediaModule;
//# sourceMappingURL=socialmedia.module.js.map