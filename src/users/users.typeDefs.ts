import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    adress: String
    adress_road: String
    adress_detail: String
    expotoken: String
    role: String!
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    totalPosts: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    stores: [Store]
    orders: [Order]
  }
`;
