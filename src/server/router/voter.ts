import { createRouter } from "./context";
import { string, z } from "zod";
import { verify } from "jsonwebtoken";
import { resolve } from "path";
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
      /* let count = await ctx.prisma.position.findFirst({}); */
      let voter = await ctx.prisma.voter.create({
        data: {
          VotingStatus: false,
          LoginTimeStamp: date.toLocaleTimeString(),
          StudentNo: parseInt(checkSorted[1]),
        },
        include: {
          student: {
            select: {
              FirstName: true,
              SirName: true,
              voter: true,
              candidate: true,
            },
          },
        },
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
      console.log(checkSorted);
      const voter = await ctx.prisma.voter.findFirst({
        where: { StudentNo: parseInt(checkSorted[1]) },
        include: {
          student: {
            select: {
              FirstName: true,
              SirName: true,
              voter: true,
              candidate: true,
            },
          },
        },
      });
      let existence;
      if (voter == null) {
        return { existence: null };
      } else {
        return { voter };
      }
    },
  })
  .mutation("castVote", {input:z.object({candidateId:z.string(),voterId:z.string(),positionId:string()}),async resolve({ctx,input}){
    const castedVote = await ctx.prisma.candidate.update({where:{CandidateId:input.candidateId!},data:{VoteCount:{increment:1}}});
    const positionTotalVote = await ctx.prisma.position.update({where:{PositionId:input.positionId},data:{VotesCast:{increment:1}}})
    //TODO use number of casts in voter object to check for how many positions the user has voted 
  }
    
    });
export default voterRouter;
