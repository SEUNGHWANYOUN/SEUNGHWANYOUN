import { gql } from "apollo-server";

export default gql`
 type Subscription {
   orderUpdates(storeId: Int!): [Order]
 }
`;