import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout";
import router from "next/router";
import { useEffect, useState } from "react";
import { Candidate, Message, Voter } from "@prisma/client";

const Home: NextPage = () => {
  const [token, setToken] = useState("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState("");
  const [isVoter, setIsVoter] = useState(false);
  const messageMutation = trpc.useMutation("voter.sendMessage");
  const [isCanditate, setIsCandidate] = useState(false);
  const [manifesto, setManifesto] = useState<string>("");
  const [resultString, setResultString] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();
  const [voter, setVoter] = useState<
    Voter & {
      student: {
        voter: Voter | null;
        candidate: Candidate | null;
        displayName: string | null;
        FirstName: string;
        SirName: string;
      };
    }
  >();
  const sendMessage = () => {
    messageMutation
      .mutateAsync({
        message: message!,
        voterId: localStorage.getItem("voterId")!,
        displayName: displayName!,
      })
      .then((res) => {
        setResultString(res.status);
        setShowToast(true);
        console.log(res.status);

        setTimeout(() => {
          setShowToast(false);
          setDisplayName("");
          setMessage("");
        }, 2000);
      });
  };
  const mutationRegisterVoter = trpc.useMutation("voter.registerVoter");
  const mutationManifesto = trpc.useMutation("candidate.updateManifesto");
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token == null) {
      router.push("/auth/signin");
    } else {
      setToken(token);
    }
  }, []);
  const register = () => {
    mutationRegisterVoter.mutateAsync({ accessToken: token }).then((res) => {
      if (res.voter) {
        setVoter(res?.voter!);
        localStorage.setItem("voterId", res.voter.VoterId);
        setIsVoter(true);
      }
    });
  };
  const updateManifesto = () => {
    mutationManifesto
      .mutateAsync({
        manifesto: manifesto,
        candidateId: voter?.student.candidate?.CandidateId!,
      })
      .then((res) => {
        setResultString(res.result);

        setShowToast(true);
        console.log(res.result);

        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      });
  };
  const { isLoading, data } = trpc.useQuery(
    ["voter.isVoter", { accessToken: token! }],
    {
      onSuccess(data) {
        if (data.existence == null) {
          setIsVoter(false);
        }
        if (data.voter) {
          if (data.voter.student.candidate !== null) {
            setIsCandidate(true);
          }
          setIsVoter(true);
          localStorage.setItem("voterId", data.voter.VoterId);
          setVoter(data.voter);
        }
      },
    }
  );
  console.log(data);
  return (
    <Layout>
      <div
        data-theme="garden"
        className="grid grid-cols-1 place-items-center h-screen "
      >
        {showToast && (
          <div className="z-10 toast toast-top">
            <div className="alert alert-info">
              <div>
                <span>{resultString}</span>
              </div>
            </div>
          </div>
        )}
        {!isVoter && (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">You are not registered as a voter</h2>
              <p>To vote for candidates you must be a registered voter</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={register}>
                  register
                </button>
              </div>
            </div>
          </div>
        )}
        {isVoter && (
          <>
            <div className="overflow-x-auto flex flex-row ">
              <table className="table mx-1">
                <thead>
                  <tr>
                    <th>Voter</th>
                    <th>id</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {voter?.student.FirstName} {voter?.student.SirName}
                    </td>
                    <td>{voter?.VoterId}</td>
                  </tr>
                </tbody>
              </table>

              {isCanditate && (
                <table className="table mx-1">
                  <thead>
                    <tr>
                      <th>candidate</th>
                      <th>id</th>
                      <th>position</th>
                      <th>Display Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {voter?.student.FirstName} {voter?.student.SirName}
                      </td>
                      <td>{voter?.student.candidate?.CandidateId}</td>
                      <td>{voter?.student.candidate?.PositionName}</td>
                      <td>{voter?.student.displayName}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex flex-row">
              {isCanditate && (
                <>
                  <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Update manisfesto</h2>
                      <textarea
                        className="textarea textarea-bordered"
                        onChange={(e) => {
                          setManifesto(e.target.value);
                        }}
                        placeholder="your manifesto"
                      ></textarea>

                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            updateManifesto();
                          }}
                        >
                          update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Messages</h2>
                      <textarea
                        className="textarea textarea-bordered"
                        onChange={(e) => {
                          setManifesto(e.target.value);
                        }}
                        placeholder="your"
                      ></textarea>

                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            updateManifesto();
                          }}
                        >
                          replyF
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {isVoter && (
                <>
                  <div className="card m-1 w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">
                        send message to a candidate
                      </h2>

                      <input
                        type="text"
                        placeholder="receipient display name"
                        onChange={(e) => {
                          setDisplayName(e.target.value);
                        }}
                        className="input input-bordered"
                      />
                      <textarea
                        className="textarea textarea-bordered"
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        placeholder="message"
                      ></textarea>

                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            sendMessage();
                          }}
                        >
                          send
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
