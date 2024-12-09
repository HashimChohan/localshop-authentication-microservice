export declare class EntityLogModel {
    date: any;
    entityName: string;
    dbName: string;
    entityId: string;
    operation: Operation;
    fieldValues: any[];
    userName: string;
    userId: string;
    status: string;
    error: string;
    query?: any;
}
export declare enum Operation {
    Create = "Create",
    Update = "Update",
    Delete = "Delete"
}
//# sourceMappingURL=entity-log.model.d.ts.map