import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
      totalPosts: ({ id }) =>
      client.user.count({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),


    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    stores: ({ id }) => client.user.findUnique({ where: { id } }).stores(),
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),

    orders: ({ id }) => client.user.findUnique({ where: { id } }).orders(),
  },



};
