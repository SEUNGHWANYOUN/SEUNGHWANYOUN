import { gql } from "apollo-server";

export default gql`
 type subscription {
    orderUpdates(userId: Int!): [Order]
 }
`;