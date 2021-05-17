import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";


const resolverFn = async ( _,{ adress, adress_road, adress_detail },{ loggedInUser }) => {
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
        adress,
        adress_road,
        adress_detail,

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
