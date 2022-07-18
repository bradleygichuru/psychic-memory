import { z } from "zod";
import { createRouter } from "./context";

const candidateRouter = createRouter()
  .mutation("addCandidate", {
    input: z
      .object({
        studentNo: z.number(),
        posName: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      console.log(input);
      const candidate = await ctx.prisma.candidate.findFirst({
        where: { StudentNo: input?.studentNo },
      });
      if (candidate == null) {
        const candidate = await ctx.prisma.candidate.create({
          data: { StudentNo: input?.studentNo!, PositionName: input?.posName! },
        });
        console.log(candidate);
        return { candidate };
      } else {
        return { result: "candidate already exists" };
      }
    },
  })
  .mutation("addPosition", {
    input: z
      .object({
        posName: z.string(),
        posDescription: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      const position = await ctx.prisma.position.findFirst({
        where: { PositionName: input?.posName },
      });
      if (position == null) {
        let position = await ctx.prisma.position.create({
          data: {
            PositionName: input?.posName!,
            PositionDescription: input?.posDescription!,
          },
        });
        return { position };
      } else {
        return { result: "position already exists" };
      }
    },
  });
export default candidateRouter;
