export interface CreatePostModel {
    userId: string;
    profilePicture: string;
    fullName: string;
    type: PostTypes;
    body: string;
    media: MediaEntity[];
    metaData: any[];
    links: any[];
    hashtags: string[];
    postPrivacy: PostPrivacy;
    watchList: WatchList[];
}
export declare enum PostTypes {
    text = "text",
    media = "media",
    charts = "charts",
    watchList = "watchList"
}
export declare class MediaEntity {
    type: string;
    url: string;
}
export declare class WatchList {
    symbol: string;
    name: string;
    price: string;
    image: string;
    country: string;
}
export declare enum PostPrivacy {
    Everyone = "everyone",
    Following = "following",
    Friends = "friends"
}
//# sourceMappingURL=createpost.model.d.ts.map