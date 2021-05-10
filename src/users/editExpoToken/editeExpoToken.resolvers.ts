import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editeExpoToken: protectedResolver(
      async (_, { id, expotoken }, { loggedInUser }) => {
        const ok = await client.user.update({
          where: {
            id,
          },
          data: {
            expotoken,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
