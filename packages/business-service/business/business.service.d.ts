import { ClientProxy } from '@nestjs/microservices';
import { AddReviewModel } from '../models/add-review.model';
import { BusinessByQueryModel } from '../models/business-by-query.model';
import { CreateBusinessModel } from '../models/create-business.model';
import { DeleteBusinessModel } from '../models/delete-business.model';
import { GetFavouritesModel } from '../models/get-favourites.model';
import { MarkFavouriteModel } from '../models/mark-favourite.model';
import { ResponseModel } from '../models/response.model';
import { UpdateBusinessModel } from '../models/update-business.model';
export declare class VendorService {
    private readonly tcpService;
    constructor(tcpService: ClientProxy);
    create(createBusinessModel: CreateBusinessModel): Promise<ResponseModel>;
    update(updateBusinessModel: UpdateBusinessModel): Promise<ResponseModel>;
    delete(deleteBusinessModel: DeleteBusinessModel): Promise<ResponseModel>;
    getbusinesssByQuery(businessByQueryModel: BusinessByQueryModel): Promise<ResponseModel>;
    getbusinessbyid(getBusinessByIdModel: DeleteBusinessModel): Promise<ResponseModel>;
    markFavourite(markfavouriteModel: MarkFavouriteModel): Promise<ResponseModel>;
    getFavourites(getFavouritesModel: GetFavouritesModel): Promise<ResponseModel>;
    addReview(addReviewModel: AddReviewModel): Promise<ResponseModel>;
    getReviews(getReviewsModel: MarkFavouriteModel): Promise<ResponseModel>;
}
//# sourceMappingURL=business.service.d.ts.map