import client from "../../client";

export default {
     Query: {
        seeStore: (_,{id}) =>
         client.store.findUnique({
             where :{
                id,

             },
             
         }),
    }
}