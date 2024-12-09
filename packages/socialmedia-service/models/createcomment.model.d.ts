import { MediaEntity } from "./createpost.model";
export interface CreateCommentModel {
    body: string;
    media: MediaEntity[];
    userId: string;
    sourceId: string;
    sourceType: string;
}
//# sourceMappingURL=createcomment.model.d.ts.map