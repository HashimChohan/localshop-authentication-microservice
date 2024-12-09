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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AuthenticationService = class AuthenticationService {
    constructor(tcpService) {
        this.tcpService = tcpService;
    }
    async signUp(signUpModel) {
        let pattern = { cmd: "signup" };
        let response = await this.tcpService.send(pattern, signUpModel).toPromise();
        return response;
    }
    async login(loginModel) {
        let pattern = { cmd: "login" };
        let response = await this.tcpService.send(pattern, loginModel).toPromise();
        return response;
    }
    async changePassword(changePasswordModel) {
        let pattern = { cmd: "changepassword" };
        let response = await this.tcpService.send(pattern, changePasswordModel).toPromise();
        return response;
    }
    async validateToken(validateTokenModel) {
        let pattern = { cmd: "validatetoken" };
        let response = await this.tcpService.send(pattern, validateTokenModel).toPromise();
        return response;
    }
    async socialLogin(socailLoginModel) {
        let pattern = { cmd: "sociallogin" };
        let response = await this.tcpService.send(pattern, socailLoginModel).toPromise();
        return response;
    }
    async forgotPassword(forgotPasswordModel) {
        let pattern = { cmd: "forgotpassword" };
        let response = await this.tcpService.send(pattern, forgotPasswordModel).toPromise();
        return response;
    }
    async resetPassword(resetPasswordToken) {
        let pattern = { cmd: "resetpassword" };
        let response = await this.tcpService.send(pattern, resetPasswordToken).toPromise();
        return response;
    }
    async emailVerificationLink(emailVerificationLink) {
        let pattern = { cmd: "emailverificationlink" };
        let response = await this.tcpService.send(pattern, emailVerificationLink).toPromise();
        return response;
    }
    async verifyEmail(verifyEmailModel) {
        let pattern = { cmd: "verifyemail" };
        let response = await this.tcpService.send(pattern, verifyEmailModel).toPromise();
        return response;
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("tcp-service")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map