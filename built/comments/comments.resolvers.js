"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Comment: {
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
    },
};
//# sourceMappingURL=comments.resolvers.js.map