import { createRouter } from "./context";
import { z } from "zod";
import { sign, verify } from "jsonwebtoken";

const authRouter = createRouter()
  .mutation("signup", {
    // check if student credentials exist prompt client student already exists else if student does not exist add student to database and return an access token
    input: z
      .object({
        studentNo: z.number(),
        firstName: z.string().nullish(),
        sirName: z.string().nullish(),
        email: z.string().nullish(),
        facualty: z.string().nullish(),
        yearOfStudy: z.number().nullish(),
        course: z.string().nullish(),
        displayName: z.string().nullish(),
        password: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      let existence = await ctx.prisma.student.findUnique({
        where: { StudentNo: input?.studentNo },
      }); //query database for student existence
      if (existence === null) {
        const res = await ctx.prisma.student.create({
          data: {
            StudentNo: input?.studentNo!,
            displayName:input?.displayName!,
            SirName: input?.sirName!,
            FirstName: input?.firstName!,
            Email: input?.email!,
            Faculty: input?.facualty!,
            password: input?.password!,
            YearOfStudy: input?.yearOfStudy!,
            Course: input?.course!,
          },
        }); //add student to the database
        if (res) {
          const accessToken = sign(
            `${input?.password} ${input?.studentNo}`,
            "V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E="
          ); //generate access token
          return { result: "student registered", accessToken: accessToken }; //return access token to the client
        }
      } else {
        return { result: "student alrealdy exist" };
      }
    },
  })
  .mutation("signin", {
    // check if credentials passed matches student credentials in the database and return an access token
    input: z.object({ studentNo: z.number(), password: z.string() }).nullish(),
    async resolve({ ctx, input }) {
      let existence = await ctx.prisma.student.findFirst({
        where: { StudentNo: input?.studentNo, password: input?.password },
      }); // query student table with credentials provided
      if (existence === null) {
        return { result: "student does not exist" }; //return a null object if student doesnt exist
      } else {
        const accessToken = sign(
          `${input?.password} ${input?.studentNo}`,
          "V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E="
        ); // generate a jwt token if student exists

        return { result: "logged in", accessToken: accessToken }; //return object containg jwt token back to the client
      }
    },
  })
  .mutation("isAdmin", {
    // check if credentials passed matches admin credentials in the database and return an access token
    input: z.object({ password: z.string(), adminName: z.string() }).nullish(),
    async resolve({ input, ctx }) {
      const admin = await ctx.prisma.admin.findFirst({
        where: { password: input?.password, AdminName: input?.adminName },
      }); // query the admin table using credentials passed
      const adminToken = sign(
        `${input?.password} ${input?.adminName}`,
        "V1hYCju+gHXdJaAVPrWR22UAK+6vYqFQYGYc0Lonj4E="
      ); // generate admin token
      if (admin) {
        return {
          token: adminToken, // if admin exists return containg jwt token back to the client
        };
      }
      if (admin == null) {
        return {
          existence: null, //if credentials do not match admin credentials return null object
        };
      }
    },
  });
export default authRouter;
