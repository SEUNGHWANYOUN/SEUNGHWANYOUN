import { gql } from "apollo-server";

export default gql`

type Query {
    seeOrders_OWNER(storeId: Int): [Order]
}


`;