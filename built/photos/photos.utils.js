"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHashtags = void 0;
const processHashtags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g) || [];
    return hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag },
    }));
};
exports.processHashtags = processHashtags;
//# sourceMappingURL=photos.utils.js.map