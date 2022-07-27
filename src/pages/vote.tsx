import { Candidate, Position } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";
const Vote: NextPage = () => {
  const [electionStarted, setElectionStarted] = useState<boolean>(false);
  const [voterId, setVoterId] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [isVoter, setIsVoter] = useState<boolean>(false);
  const [positions, setPositions] = useState<
    (Position & {
      candidates: {
        student: {
          StudentNo: number;
          FirstName: string;
          SirName: string;
          candidate: Candidate | null;
        };
        CandidateId: string;
      }[];
    })[]
  >();
 
  const { isLoading } = trpc.useQuery(["candidate.getPositions"], {
    onSuccess(data) {
      setPositions(data.positions);
    },
  });

  const voteMutation = trpc.useMutation("voter.castVote");
  const castVote = (
    candidateId: string,
    voterId: string,
    positionId: string
  ) => {
    let token = localStorage.getItem(`${voterId + candidateId}`);
    if (token == "true") {
      setStatus("you already voted for that candidate ");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } else {
      voteMutation
        .mutateAsync({
          candidateId: candidateId,
          voterId: voterId,
          positionId: positionId,
        })
        .then(() => {
          setStatus("vote casted");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 5000);
          localStorage.setItem(`${voterId + candidateId}`, "true");
        });
    }
  };
  const router = useRouter();
  useEffect(() => {
    
    console.log(voterId);
    let token = sessionStorage.getItem("token");
    if (token == null) {
      router.push("/auth/signin");
    }else{
      let token = localStorage.getItem("voterId")!
      if(token){
       setVoterId(token);
       setIsVoter(true)

      }
      setIsVoter(true)
    }
    
  }, []);
  
  const candidates = (): ReactNode => {
    return positions?.map((val, index) => {
      const positionTitle = val.PositionName;
      const candidates = val.candidates.map((val2, index2) => {
        return (
          <>
            
            <div
              key={`${val2.student.StudentNo}`}
              className="card w-96 bg-base-100  "
            >
              <div className="card-body">
                <div className="grid card-title m-3">
                  <h1 className="card-title justify-self-center">{`${val2.student.FirstName} ${val2.student.SirName}`}</h1>
                </div>
                <h3 className="card-title underline decoration-primary">{`${val2.student.FirstName} ${val2.student.SirName}'s manifesto`}</h3>

                <p>{val2.student.candidate?.Manifesto}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      castVote(val2.CandidateId, voterId, val.PositionId);
                    }}
                    disabled={!electionStarted}
                  >
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
        <div key={index} className="">
          <div className="border-primary border-4 p-2">
            <h2 className="card-title text-primary">
              {positionTitle} position
            </h2>
            {candidates}
          </div>
        </div>
      );
    });
  };
  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center h-screen">
      {showToast && (
              <div className="toast toast-top">
                <div className="alert alert-info">
                  <div>
                    <span>{status}</span>
                  </div>
                </div>
              </div>
            )}
       {isVoter && <div className="grid grid-cols-1 sm:grid-cols-2">{candidates()}</div>}
       {!isVoter && (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">You are not registered as a voter</h2>
              <p>To vote for candidates you must be a registered voter</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={()=>{router.push("/")}}>
                  register
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};
export default Vote;
