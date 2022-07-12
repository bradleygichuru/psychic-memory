import { createRouter } from "./context";
import { z } from "zod";
import {sign,verify} from "jsonwebtoken"

const authRouter = createRouter()
  .mutation("signup", {
    input: z
      .object({
        studentNo: z.number(),
        firstName: z.string().nullish(),
        sirName: z.string().nullish(),
        email: z.string().nullish(),
        facualty: z.string().nullish(),
        yearOfStudy: z.number().nullish(),
        course: z.string().nullish(),
        password: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      let existence = await ctx.prisma.student.findUnique({
        where: { StudentNo: input?.studentNo },
      });
      if (existence === null) {
        const res = await ctx.prisma.student.create({
          data: {
            StudentNo: input?.studentNo!,
            SirName: input?.sirName!,
            FirstName: input?.firstName!,
            Email: input?.email!,
            Faculty: input?.facualty!,
            password: input?.password!,
            YearOfStudy: input?.yearOfStudy!,
            Course: input?.course!,
          },
        });
        if (res) {
          const accessToken = sign(`${input?.password} ${input?.studentNo}`,"V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E=");
          return { result: "student registered",accessToken:accessToken};
        }
      } else {
        return { result: "student alrealdy exist" };
      }
    },
  })
  .mutation("signin", {
    input: z.object({ studentNo: z.number(), password: z.string() }).nullish(),
    async resolve({ ctx ,input}) {
      let existence = await ctx.prisma.student.findFirst({
        where: { StudentNo: input?.studentNo ,password:input?.password},
      });
      if (existence === null) {
        return{result:"student does not exist"}
      }else{
        const accessToken = sign(`${input?.password} ${input?.studentNo}`,"V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E=");
        return { result: "logged in",accessToken:accessToken};
      }
     
    },
  });
export default authRouter;
