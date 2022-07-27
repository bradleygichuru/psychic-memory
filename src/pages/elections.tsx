import { Candidate, Position, Student } from "@prisma/client";
import { NextPage } from "next";
import { ReactNode, useState } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

const Elections: NextPage = () => {
  const [data, setData] = useState<
    {
      candidates: (Candidate & {
        student: Student;
      })[];
      PositionName: string;
      VotesCast: number;
    }[]
  >();
  const { isLoading } = trpc.useQuery(["candidate.getVotes"], {
    onSuccess(data) {
      if (data.votes) {
        setData(data.votes);
      } else {
        console.log("error occured");
      }
    },
  });
  const votePercentage = (voteCount: number, VotesCast: number) => {
    if (voteCount == 0 || VotesCast == 0) {
      return 0;
    }
    return Math.floor((voteCount / VotesCast) * 100);
  };
  const votes = (): ReactNode => {
    return data?.map((val, index) => {
      const positionTitle = val.PositionName;
      const votes = val.candidates.map((val2, index2) => {
        return (
          <>
            <div className="stats shadow" key={index2}>
              <div className="stat">
                <div className="stat-title">
                  Total Votes for {val2.student.FirstName}{" "}
                  {val2.student.SirName}
                </div>
                <div className="stat-value">
                  {votePercentage(val2.VoteCount, val.VotesCast)}%
                </div>

                <div className="stat-desc">
                  percentage against percentage of votes cast
                </div>
              </div>
            </div>
          </>
        );
      });
      return (
        <div key={index} className="">
          <div className="border-primary border-4 p-2">
            <h2 className="card-title text-primary">
              {positionTitle} position
            </h2>
            {votes}
          </div>
        </div>
      );
    });
  };
  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2">{votes()}</div>
      </div>
    </Layout>
  );
};
export default Elections;
