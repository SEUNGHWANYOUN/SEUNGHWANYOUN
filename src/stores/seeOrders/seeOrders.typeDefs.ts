import { gql } from "apollo-server";

export default gql`
 type Query {
    seeOrders(userId: Int!): [Order]
 }
`;