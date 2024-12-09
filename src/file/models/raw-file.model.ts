export class RawFile {
    constructor(id : string){
        this._id = id;
    }
    url:string;
    thumbUrl:string;
    _id : string;   
    encoding:string;
    fieldname:string;
    mimetype:string;
    originalname:string;
    size:number;
    sizeInWords : string;
    refId : string;
}