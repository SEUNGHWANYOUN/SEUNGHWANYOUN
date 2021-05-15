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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../users.utils");
const shared_utils_1 = require("../../shared/shared.utils");
const resolverFn = (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
    let avatarUrl = null;
    if (avatar) {
        avatarUrl = yield shared_utils_1.uploadToS3(avatar, loggedInUser.id, "avatars");
        /* const { filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + newFilename
        );
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`; */
    }
    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = yield bcrypt_1.default.hash(newPassword, 10);
    }
    const updatedUser = yield client_1.default.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: Object.assign(Object.assign({ firstName,
            lastName,
            username,
            email,
            bio }, (uglyPassword && { password: uglyPassword })), (avatarUrl && { avatar: avatarUrl })),
    });
    if (updatedUser.id) {
        return {
            ok: true,
        };
    }
    else {
        return {
            ok: false,
            error: "Could not update profile.",
        };
    }
});
exports.default = {
    Mutation: {
        editProfile: users_utils_1.protectedResolver(resolverFn),
    },
};
//# sourceMappingURL=editProfile.resolvers.js.map