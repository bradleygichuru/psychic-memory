import { createRouter } from "./context";
import { z } from "zod";
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
  .mutation("castVote", {
    input: z.object({
      positionId: z.string(),
      candidateId: z.string(),
      voterId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const vote = await ctx.prisma.vote.create({
        data: {
          PositionId: input.positionId,
          CandidateId: input.candidateId,
          VoterId: input.voterId,
        },
      });
      if (vote) {
        return { result: "vote cast" };
      } else {
        return { result: "something went wrong" };
      }
    },
  });
export default voterRouter;
