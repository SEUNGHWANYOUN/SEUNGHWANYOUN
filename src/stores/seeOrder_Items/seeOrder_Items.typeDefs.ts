import { gql } from "apollo-server";

export default gql`
type Query {
    seeOrder_Items(orderId : Int!):[Order_Item]
}

`;