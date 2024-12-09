import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common";
// import { Operation } from "mongodb-crud-operations";
// import { CollectionNames} from "src/environment";
// import { ResponseModel } from "src/response.model";
import { AuthService } from "./auth.service";
// import { v4 as uuidv4 } from 'uuid';
// import * as bcrypt from "bcrypt";

@Injectable()
export class MultitenantService extends AuthService {


    // public async signUp(data: any): Promise<ResponseModel> {
    //     try {
    //         let superResponse = await super.signUp(data);
    //         if (!superResponse.isSuccess) {
    //             return superResponse;
    //         }
    //         let tenant = await this.createTenant(data.tenant, superResponse.data.user._id);
    //         let user = await this.updateTenantIdInUser(superResponse.data.user, tenant._id);
    //         let emailVerificationToken = user.emailVerificationToken;
    //         delete user.emailVerificationToken;
    //         delete user.password;
    //         delete user._id;
    //         delete user.tenantIds;
    //         await this.createAgent(user, superResponse.data.user._id, tenant._id);
    //         let emailVerificationLink = `${this.configService.get("EMAIL_VERIFICATION_URL")}?token=${emailVerificationToken}`;
    //         return this.utilService.getResponseObject(true, "", { emailVerificationLink: emailVerificationLink });
    //     }
    //     catch (err) {
    //         return this.utilService.getResponseObject(false, "Something Went Wrong.");
    //     }
    // }

    // public async signUpWithInvite(data: any) {
    //     try {
    //         let findUserModel = this.utilService.getfindDataModelQuery(this.configService.get("DATABASE_NAME"), CollectionNames.Users, { email: data.email });
    //         let users = await this.mongoService.filterByLocation(findUserModel);
    //         if (users.length > 1) {
    //             return this.utilService.getResponseObject(false, "User Already Exists.");
    //         }

    //         let findInviteModel = await this.utilService.getfindDataModelId(this.configService.get("DATABASE_NAME"), CollectionNames.Invites, data.inviteId);
    //         let invite = await this.mongoService.findOne(findInviteModel);
    //         if (!invite) {
    //             return this.utilService.getResponseObject(false, "Invalid Invite Id");
    //         }
    //         else if (invite && invite.email != data.email) {
    //             return this.utilService.getResponseObject(false, "Unauthorized");
    //         }

    //         let findTenantModel = this.utilService.getfindDataModelQuery(this.configService.get("DATABASE_NAME"), CollectionNames.Invites, { subdomain: data.redirectSubdomain + "." + data.subdomain });
    //         let tenants = await this.mongoService.filterByLocation(findTenantModel);
    //         if (tenants.length === 0) {
    //             return this.utilService.getResponseObject(false, "Tenant Not Found.");
    //         }
    //         let tenant = { ...tenants[0] };
    //         let user = await this.createInvitationUser(data, tenant._id, invite.name);
    //         return this.utilService.getResponseObject(true, "", { user: user, tenant: tenant, invite: invite });
    //     }
    //     catch (err) {
    //         return this.utilService.getResponseObject(false, "Something Went Wrong.");
    //     }
    // }


    // //Private Functions
    // public async createInvitationUser(data: any, tenantId: string, name: string): Promise<any> {
    //     let userData: any = {};
    //     userData.email = data.email;
    //     userData.isEmailVerified = true;
    //     userData.password = await bcrypt.hash(data.password, this.configService.get("BCRYPT_HASH_ROUNDS"));
    //     userData.firstName = name;
    //     userData.lastName = "";
    //     userData.tenantIds = [];
    //     userData.tenantIds.push(tenantId);
    //     let userEntityModel = this.utilService.getEntityLog(userData, this.configService.get("DATABASE_NAME"), CollectionNames.Users, Operation.Update, "", "", new Date().getTime().toString());
    //     const user = await this.mongoService.update(userEntityModel);
    //     return user;
    // }

    // private async updateTenantIdInUser(userData: any, tenantId: string) {
    //     let user = { ...userData };
    //     let index = user.tenantIds.indexOf(tenantId);
    //     if (index === -1) {
    //         user.tenantIds.push(tenantId);
    //     }
    //     let userId = user._id;
    //     delete user._id;
    //     user.emailVerificationToken = uuidv4();
    //     let userEntityLog = this.utilService.getEntityLog(user, this.configService.get("DATABASE_NAME"), CollectionNames.Users, Operation.Update, "", "", userId);
    //     user = await this.mongoService.update(userEntityLog);
    //     return user;
    // }


    // private async createTenant(tenantData: any, userId: string) {
    //     let tenant = { ...tenantData };
    //     tenant.ownerId = userId;
    //     let tenantId = new Date().getTime().toString();
    //     try {
    //         if (this.configService.get("CLOUD_FLARE_CONFIG").isActive) {
    //             await this.createSubdomain(tenant.subdomain, this.configService.get("BASEURL"));
    //             tenant.isSubdomainActive = true;
    //         }
    //         else {
    //             tenant.isSubdomainActive = false;
    //         }
    //     }
    //     catch (err) {
    //         tenant.isSubdomainActive = false;
    //     }
    //     let tenantEntityLog = this.utilService.getEntityLog(tenant, this.configService.get("DATABASE_NAME"), CollectionNames.Tenants, Operation.Update, "", "", tenantId);
    //     tenant = await this.mongoService.update(tenantEntityLog);
    //     return tenant;
    // }

    // private async createAgent(user: any, userId: string, tenantId: string) {
    //     let agent = { ...user };
    //     agent.userId = userId;
    //     agent.tenantId = tenantId;
    //     agent.invitationAccepted = true;
    //     let agentEntityModel = this.utilService.getEntityLog(agent, this.configService.get("SECONDARY_DATABASE_NAME"), CollectionNames.Agents, Operation.Update, "", "", new Date().getTime().toString());
    //     agent = await this.mongoService.update(agentEntityModel);
    //     return agent;
    // }


    // private async createSubdomain(subdomain: string, domain: string) {
    //     const headersRequest = {
    //         "Content-Type": "application/json", // afaik this one is not needed
    //         "X-Auth-Key": this.configService.get("CLOUD_FLARE_CONFIG").authKey,
    //         "X-Auth-Email": this.configService.get("CLOUD_FLARE_CONFIG").authEmail
    //     };
    //     let accountId = this.configService.get("CLOUD_FLARE_CONFIG").accountId;
    //     const body = {
    //         "type": "CNAME",
    //         "name": subdomain,
    //         "content": domain,
    //         "ttl": 120,
    //         "priority": 10,
    //         "proxied": true
    //     };

    //     let response = await this.httpService.post(`https://api.cloudflare.com/client/v4/zones/${accountId}/dns_records`, body, { headers: headersRequest }).toPromise();

    //     let cloudFlareLog = {
    //         subdomain: subdomain,
    //         data: response.data.result
    //     };
    //     let cloudFlareEntityLog = this.utilService.getEntityLog(cloudFlareLog, this.configService.get("DATABASE_NAME"), CollectionNames.CloudFlareLogs, Operation.Update, "", "", new Date().getTime().toString());
    //     await this.mongoService.update(cloudFlareEntityLog);

    //     if (response.status != 200) {
    //         throw new HttpException("There was an error please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

}