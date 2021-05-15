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
const apollo_server_1 = require("apollo-server");
const client_1 = __importDefault(require("../../client"));
const constants_1 = require("../../constants");
const pubsub_1 = __importDefault(require("../../pubsub"));
exports.default = {
    Subscription: {
        roomUpdates: {
            subscribe: (root, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                const room = yield client_1.default.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id,
                            },
                        },
                    },
                    select: {
                        id: true,
                    },
                });
                if (!room) {
                    throw new Error("You shall not see this.");
                }
                return apollo_server_1.withFilter(() => pubsub_1.default.asyncIterator(constants_1.NEW_MESSAGE), ({ roomUpdates }, { id }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
                    if (roomUpdates.roomId === id) {
                        const room = yield client_1.default.room.findFirst({
                            where: {
                                id,
                                users: {
                                    some: {
                                        id: loggedInUser.id,
                                    },
                                },
                            },
                            select: {
                                id: true,
                            },
                        });
                        if (!room) {
                            return false;
                        }
                        return true;
                    }
                }))(root, args, context, info);
            }),
        },
    },
};
//# sourceMappingURL=roomUpdates.resolvers.js.map