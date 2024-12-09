export interface GetConnectionsModel {
    connectionType: ConnectionType;
    userId: string;
}
export declare enum ConnectionType {
    requests = "requests",
    invited = "invited",
    following = "following",
    followers = "followers",
    friends = "friends",
    all = "all"
}
//# sourceMappingURL=getconnections.model.d.ts.map