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
exports.SocialmediaService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let SocialmediaService = class SocialmediaService {
    constructor(tcpService) {
        this.tcpService = tcpService;
    }
    async blockUser(data) {
        let pattern = { cmd: "blockuser" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async unblockUser(data) {
        let pattern = { cmd: "unblockuser" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async getBlockedUsers(data) {
        let pattern = { cmd: "getblockedusers" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async getUsers(data) {
        let pattern = { cmd: "getusers" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async addConnection(data) {
        let pattern = { cmd: "addConnection" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async getConnections(data) {
        let pattern = { cmd: "getConnections" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async respondFriendRequest(data) {
        let pattern = { cmd: "respondFriendRequest" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async connectionTypeCounts(data) {
        let pattern = { cmd: "connectiontypecounts" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async unfollow(data) {
        let pattern = { cmd: "unfollow" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async createPost(data) {
        let pattern = { cmd: "createPost" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async updatePost(data) {
        let pattern = { cmd: "updatePost" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async removeFriend(data) {
        let pattern = { cmd: "removefriend" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async cancelRequest(data) {
        let pattern = { cmd: "cancelrequest" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async markNotificationsViewed(data) {
        let pattern = { cmd: "marknotificationsviewed" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async likePost(likePostModel) {
        let pattern = { cmd: "addreaction" };
        let response = await this.tcpService.send(pattern, likePostModel).toPromise();
        return response;
    }
    async unLikePost(unlikePostModel) {
        let pattern = { cmd: "removereaction" };
        let response = await this.tcpService.send(pattern, unlikePostModel).toPromise();
        return response;
    }
    async deletePost(deletePostModel) {
        let pattern = { cmd: "deletepost" };
        let response = await this.tcpService.send(pattern, deletePostModel).toPromise();
        return response;
    }
    async getMetaData(getMetaModel) {
        let pattern = { cmd: "geturlmetadata" };
        let response = await this.tcpService.send(pattern, getMetaModel).toPromise();
        return response;
    }
    async addComment(createCommentModel) {
        let pattern = { cmd: "addcomment" };
        let response = await this.tcpService.send(pattern, createCommentModel).toPromise();
        return response;
    }
    async addInitialPosts(data) {
        let pattern = { cmd: "addinitialposts" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async getTaggedUsers(data) {
        let pattern = { cmd: "getusersfortagging" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async createStock(data) {
        let pattern = { cmd: "createStock" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async findAllStocks(data) {
        let pattern = { cmd: "findAllStocks" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async removeStock(data) {
        let pattern = { cmd: "removeStock" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async getAllTopFriends(data) {
        let pattern = { cmd: "getTopFriends" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async searchTopFriends(data) {
        let pattern = { cmd: "searchTopFriends" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async addTopFriend(data) {
        let pattern = { cmd: "addTopFriend" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async removeTopFriend(data) {
        let pattern = { cmd: "removeTopFriend" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
    async addPollVote(data) {
        let pattern = { cmd: "voteOnPollChart" };
        let response = await this.tcpService.send(pattern, data).toPromise();
        return response;
    }
};
SocialmediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("tcp-service")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], SocialmediaService);
exports.SocialmediaService = SocialmediaService;
//# sourceMappingURL=socialmedia.service.js.map