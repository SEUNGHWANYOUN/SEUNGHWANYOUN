import { gql } from "apollo-server";

export default gql`
    type Query {
        seeStore(id: Int!): Store!
    }
`;

