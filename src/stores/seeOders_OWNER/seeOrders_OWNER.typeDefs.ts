import { gql } from "apollo-server";

export default gql`

type Query {
    seeOrders_OWNER(id: Int): [Order]
}


`;