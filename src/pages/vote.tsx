import { Candidate, Position } from "@prisma/client";
import { NextPage } from "next";
import { ReactNode, useState } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";
const Vote: NextPage = () => {

  const [positions, setPositions] = useState<
    (Position & {
      candidates: {
        student: {
          StudentNo: number;
          candidate: Candidate | null;
          FirstName: string;
          SirName: string;
        };
    }[];
    })[]
  >();
  const { isLoading } = trpc.useQuery(["candidate.getPositions"], {
    onSuccess(data) {
      setPositions(data.positions);
      
    },
  });
  const candidates = (): ReactNode => {
    return positions?.map((val, index) => {
      const positionTitle = val.PositionName;
      const candidates = val.candidates.map((val2, index2) => {
        return (
          <>
            <div
              key={`${val2.student.StudentNo}`}
              className="card w-96 bg-base-100 "
            >
              <div className="card-body">
                <div className="grid card-title m-3">
                  <h1 className="card-title justify-self-center">{`${val2.student.FirstName} ${val2.student.SirName}`}</h1>
                </div>
                <h3 className="card-title underline decoration-primary">{`${val2.student.FirstName} ${val2.student.SirName}'s manifesto`}</h3>

                <p>
                 {val2.student.candidate?.Manifesto}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    vote for{" "}
                    {`${val2.student.FirstName} ${val2.student.SirName}`}
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      });
      return (
        <div key={index} className="card mx-4 w-96 bg-base-100  ">
          <div className="card-body">
            <h2 className="card-title">{positionTitle}</h2>
            {candidates}
          </div>
        </div>
      );
    });
  };
  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2">{candidates()}</div>
      </div>
    </Layout>
  );
};
export default Vote;
