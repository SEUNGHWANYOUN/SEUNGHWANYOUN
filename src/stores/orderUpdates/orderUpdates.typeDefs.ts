import { gql } from "apollo-server";

export default gql`
 type Subscription {
  #  배열로했을때 값 못가져옴 error 이상하게 나옴 찾을수 없다고 orderUpdates
   orderUpdates(id: Int!): Order
 }
`;