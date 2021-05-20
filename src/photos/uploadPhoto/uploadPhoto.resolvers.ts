import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {  
      try {       
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        } 
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        await client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        return {
          ok :true
      } ;
        
      } catch (e) {

        return {
          ok :false,
          error: "cant upload photo"+e,
      };
        
      }

      }
    ),
  },
};
