import { Candidate, Position, Student } from "@prisma/client";
import { NextPage } from "next";
import { ReactNode, useState } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

const Elections: NextPage = () => {
  const { isLoading, data } = trpc.useQuery(["candidate.getVotes"], {
    onSuccess(data) {
      if (data) {
        console.log("success")
      } else {
        console.log("error occured");
      }
    },
  });
  console.log({ data })
  const votePercentage = (voteCount: number, VotesCast: number) => {
    if (voteCount == 0 || VotesCast == 0) {
      return 0;
    }
    return ((voteCount / VotesCast) * 100);
  };
  const votes = (): ReactNode => {
    return data?.votes?.map((val, index) => {
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
                  {votePercentage(val2.VoteCount, data.votesCast)}%
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
