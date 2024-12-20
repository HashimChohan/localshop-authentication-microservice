import { ClientProxy } from '@nestjs/microservices';
import { MarkNotificationsViewed } from '..';
import { AddConnectionModel } from '../models/addconnection.model';
import { AddTopFriend } from '../models/addtopfriend.dto';
import { BlockUserModel } from '../models/blockuser.model';
import { ConnectionTypeCountsModel } from '../models/connectiontypecounts.model';
import { CreateStockDTO } from '../models/create-stock.dto';
import { CreateCommentModel } from '../models/createcomment.model';
import { CreatePostModel } from '../models/createpost.model';
import { DeletePostModel } from '../models/deletepost.model';
import { FindAllStockDTO } from '../models/findAll-stock.dto';
import { GetAllTopFriends } from '../models/getalltopfriends.model';
import { GetBlockedUsersModel } from '../models/getblockedusers.model';
import { GetConnectionsModel } from '../models/getconnections.model';
import { GetMetaDataModel } from '../models/getmetadata.model';
import { GetUsersModel } from '../models/getusers.model';
import { LikePostModel } from '../models/likepost.model';
import { ReactPollDTO } from '../models/poll-vote.dto';
import { RemoveStockDTO } from '../models/remove-stock.dto';
import { RemoveFriendModel } from '../models/removefriend.model';
import { RespondFriendRequest } from '../models/respondfriendrequest.model';
import { SearchTopFriend } from '../models/searchtopfriends.model';
import { UnblockUserModel } from '../models/unblockuser.model';
import { UnfollowModel } from '../models/unfollow.model';
import { UnlikePostModel } from '../models/unlikepost.model';
import { UpdatePostModel } from '../models/updatepost.model';
export declare class SocialmediaService {
    private readonly tcpService;
    constructor(tcpService: ClientProxy);
    blockUser(data: BlockUserModel): Promise<any>;
    unblockUser(data: UnblockUserModel): Promise<any>;
    getBlockedUsers(data: GetBlockedUsersModel): Promise<any>;
    getUsers(data: GetUsersModel): Promise<any>;
    addConnection(data: AddConnectionModel): Promise<any>;
    getConnections(data: GetConnectionsModel): Promise<any>;
    respondFriendRequest(data: RespondFriendRequest): Promise<any>;
    connectionTypeCounts(data: ConnectionTypeCountsModel): Promise<any>;
    unfollow(data: UnfollowModel): Promise<any>;
    createPost(data: CreatePostModel): Promise<any>;
    updatePost(data: UpdatePostModel): Promise<any>;
    removeFriend(data: RemoveFriendModel): Promise<any>;
    cancelRequest(data: RemoveFriendModel): Promise<any>;
    markNotificationsViewed(data: MarkNotificationsViewed): Promise<any>;
    likePost(likePostModel: LikePostModel): Promise<any>;
    unLikePost(unlikePostModel: UnlikePostModel): Promise<any>;
    deletePost(deletePostModel: DeletePostModel): Promise<any>;
    getMetaData(getMetaModel: GetMetaDataModel): Promise<any>;
    addComment(createCommentModel: CreateCommentModel): Promise<any>;
    addInitialPosts(data: any): Promise<any>;
    getTaggedUsers(data: any): Promise<any>;
    createStock(data: CreateStockDTO): Promise<any>;
    findAllStocks(data: FindAllStockDTO): Promise<any>;
    removeStock(data: RemoveStockDTO): Promise<any>;
    getAllTopFriends(data: GetAllTopFriends): Promise<any>;
    searchTopFriends(data: SearchTopFriend): Promise<any>;
    addTopFriend(data: AddTopFriend): Promise<any>;
    removeTopFriend(data: AddTopFriend): Promise<any>;
    addPollVote(data: ReactPollDTO): Promise<any>;
}
//# sourceMappingURL=socialmedia.service.d.ts.map