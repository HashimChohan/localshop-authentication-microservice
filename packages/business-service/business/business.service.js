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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let VendorService = class VendorService {
    constructor(tcpService) {
        this.tcpService = tcpService;
    }
    async create(createBusinessModel) {
        let pattern = { cmd: "create" };
        let response = await this.tcpService.send(pattern, createBusinessModel).toPromise();
        return response;
    }
    async update(updateBusinessModel) {
        let pattern = { cmd: "update" };
        let response = await this.tcpService.send(pattern, updateBusinessModel).toPromise();
        return response;
    }
    async delete(deleteBusinessModel) {
        let pattern = { cmd: "delete" };
        let response = await this.tcpService.send(pattern, deleteBusinessModel).toPromise();
        return response;
    }
    async getbusinesssByQuery(businessByQueryModel) {
        let pattern = { cmd: "getbusinesssbyquery" };
        let response = await this.tcpService.send(pattern, businessByQueryModel).toPromise();
        return response;
    }
    async getbusinessbyid(getBusinessByIdModel) {
        let pattern = { cmd: "getbusinessbyid" };
        let response = await this.tcpService.send(pattern, getBusinessByIdModel).toPromise();
        return response;
    }
    async markFavourite(markfavouriteModel) {
        let pattern = { cmd: "markfavourite" };
        let response = await this.tcpService.send(pattern, markfavouriteModel).toPromise();
        return response;
    }
    async getFavourites(getFavouritesModel) {
        let pattern = { cmd: "getfavourites" };
        let response = await this.tcpService.send(pattern, getFavouritesModel).toPromise();
        return response;
    }
    async addReview(addReviewModel) {
        let pattern = { cmd: "addreview" };
        let response = await this.tcpService.send(pattern, addReviewModel).toPromise();
        return response;
    }
    async getReviews(getReviewsModel) {
        let pattern = { cmd: "getreviews" };
        let response = await this.tcpService.send(pattern, getReviewsModel).toPromise();
        return response;
    }
};
VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("tcp-service")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=business.service.js.map