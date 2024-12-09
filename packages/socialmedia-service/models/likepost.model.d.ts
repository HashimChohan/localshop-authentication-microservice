export interface LikePostModel {
    sourceId: string;
    sourceType: string;
    userId: string;
    reactionType: ReactionType;
}
export declare enum ReactionType {
    Like = "like",
    Heart = "heart",
    Appreciated = "appreciated",
    Kiss = "kiss"
}
//# sourceMappingURL=likepost.model.d.ts.map