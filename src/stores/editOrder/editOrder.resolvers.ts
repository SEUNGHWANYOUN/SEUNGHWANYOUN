import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editOrder: protectedResolver(
      async (_, { id, status }, { loggedInUser }) => {
        const ok = await client.order.update({
          where: {
            id,
          },
          data: {
            status,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
