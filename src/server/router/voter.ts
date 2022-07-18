import { createRouter } from "./context";
import { z } from "zod";
import { verify } from "jsonwebtoken";
//TODO document
const date = new Date();
const voterRouter = createRouter()
  .mutation("registerVoter", {
    input: z.object({
      accessToken: z.string(),
    }),
    async resolve({ input, ctx }) {
      let check = verify(
        input.accessToken,
        "V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E="
      );

      let checkSorted = check.split(" ");
      console.log(checkSorted);
      let voter = await ctx.prisma.voter.create({
        data: {
          VotingStatus: false,
          LoginTimeStamp: date.toLocaleTimeString(),
          StudentNo: parseInt(checkSorted[1]),
        },include:{student:true}
      });

      return { voter };
    },
  })
  .query("isVoter", {
    input: z.object({
      accessToken: z.string(),
    }),
    async resolve({ input, ctx }) {
      let check = verify(
        input.accessToken,
        "V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E="
      );
      let checkSorted = check.split(" ");
      console.log(checkSorted)
      const voter = await ctx.prisma.voter.findFirst({
        where: { StudentNo: parseInt(checkSorted[1]) },include:{student:true}
      });
      let existence;
      if (voter == null) {
        return { existence: null };
      } else {
        return { voter};
      }
    },
  });
export default voterRouter;
