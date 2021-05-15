"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seePhotoComments: (_, { id }) => client_1.default.comment.findMany({
            where: {
                photoId: id,
            },
            orderBy: {
                createdAt: "asc",
            },
        }),
    },
};
//# sourceMappingURL=seePhotoComments.resolvers.js.map