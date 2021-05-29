import { gql } from "apollo-server";

export default gql`
  type Query{
      seeStores(address: String!): [Store]
  }
`;