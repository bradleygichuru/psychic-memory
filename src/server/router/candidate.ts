import { z, ZodLazy } from "zod";
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
  })
  .query("getPositions", {
    async resolve({ ctx }) {
      const positions = await ctx.prisma.position.findMany({
        include: { candidates:{select:{student:{select:{candidate:true,StudentNo:true,FirstName:true,SirName:true}}}}}
      });
      return { positions };
    },
  })
  .mutation("updateManifesto", {
    input: z
      .object({ manifesto: z.string(), candidateId: z.string() })
      .nullish(),
    async resolve({ input, ctx }) {
      const candidateWithManifesto = await ctx.prisma.candidate.update({
        where: { CandidateId: input?.candidateId },
        data: { Manifesto: input?.manifesto },
      });
      if(candidateWithManifesto){
        return{result:"manifesto updated"}
      }else{
        return{
          result:"something went wrong updating your manifesto"
        }
      }
    },
  });
export default candidateRouter;
