import { gql } from "apollo-server";

export default gql`
  type Store{
    id: Int!
    name: String!
    mainimg: String!
    adress: String!
    phone: String!
    products: [Product]
    orders:   [Order]  
    userId:    Int!
    minprice: Int!
    riderprice: Int!
    createdAt: String!
    updatedAt: String!
    isPromoted: String! 
    promotedUntil: String
  }

  type Product{
    id:          Int!
    photo:       String!
    name:        String!
    price:       Int!
    description: String
    options:     String
    storeId:     Int!  
    createdAt:   String!
    updatedAt:   String!

  }

  type Order {
    id:           Int!
    total:        Int!
    status:       String!
    storeId:      Int!
    userId:       Int!
    riderId:      Int
    order_items: [Order_Item]
    createdAt:   String!
    updatedAt:   String!
   
  }

  type Order_Item{
    id:          Int!
    orderId:     Int!
    options:     String!
    productId:   Int!
    createdAt:   String!
    updatedAt:   String!
  }



`;


// category: Category;
// ownerId: number;
// owner: User;
// orders: Order[];
// menu: Dish[];
