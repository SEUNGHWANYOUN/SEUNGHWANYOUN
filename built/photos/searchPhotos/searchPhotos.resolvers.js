"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        searchPhotos: (_, { keyword }) => {
            return client_1.default.photo.findMany({
                where: {
                    caption: {
                        contains: keyword,
                    },
                },
            });
        },
    },
};
//# sourceMappingURL=searchPhotos.resolvers.js.map