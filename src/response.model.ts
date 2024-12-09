export class ResponseModel {
    isSuccess: boolean;
    data: any;
    message: string;

    constructor(isSuccess:boolean,data:any,message:string){
        this.isSuccess = isSuccess;
        this.data = data;
        this.message = message;
    }
}