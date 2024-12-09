export interface AddConnectionModel {
    userId: string;
    connectionId: string;
    requestType: RequestType;
}
export declare enum RequestType {
    friends = "friends",
    following = "following",
    friendrequest = "friendrequest"
}
export declare enum RequestStatus {
    pending = "pending",
    accept = "accept",
    reject = "reject"
}
//# sourceMappingURL=addconnection.model.d.ts.map