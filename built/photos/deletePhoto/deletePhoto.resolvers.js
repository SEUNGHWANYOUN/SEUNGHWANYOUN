"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Mutation: {
        deletePhoto: users_utils_1.protectedResolver((_, { id }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const photo = yield client_1.default.photo.findUnique({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found.",
                };
            }
            else if (photo.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "Not authorized.",
                };
            }
            else {
                yield client_1.default.photo.delete({
                    where: {
                        id,
                    },
                });
                return {
                    ok: true,
                };
            }
        })),
    },
};
//# sourceMappingURL=deletePhoto.resolvers.js.map