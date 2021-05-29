import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";


const resolverFn = async ( _,{ address,  address_detail,roadAddress,roadAddress_detail },{ loggedInUser }) => {
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
        address,
        address_detail,
        roadAddress,
        roadAddress_detail

    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfileAdress: protectedResolver(resolverFn),
  },
};
