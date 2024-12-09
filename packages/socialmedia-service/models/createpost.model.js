"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPrivacy = exports.WatchList = exports.MediaEntity = exports.PostTypes = void 0;
var PostTypes;
(function (PostTypes) {
    PostTypes["text"] = "text";
    PostTypes["media"] = "media";
    PostTypes["charts"] = "charts";
    PostTypes["watchList"] = "watchList";
})(PostTypes = exports.PostTypes || (exports.PostTypes = {}));
class MediaEntity {
}
exports.MediaEntity = MediaEntity;
class WatchList {
}
exports.WatchList = WatchList;
var PostPrivacy;
(function (PostPrivacy) {
    PostPrivacy["Everyone"] = "everyone";
    PostPrivacy["Following"] = "following";
    PostPrivacy["Friends"] = "friends";
})(PostPrivacy = exports.PostPrivacy || (exports.PostPrivacy = {}));
//# sourceMappingURL=createpost.model.js.map