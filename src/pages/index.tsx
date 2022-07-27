import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { BiChevronsRight } from "react-icons/bi";
import Layout from "../components/layout";
import router from "next/router";
import { useEffect, useState } from "react";
import { Candidate, Student, Voter } from "@prisma/client";
import { object } from "zod";

const Home: NextPage = () => {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isVoter, setIsVoter] = useState(false);
  const [isCanditate, setIsCandidate] = useState(false);
  const [manifesto, setManifesto] = useState<string>("");
  const [resultString, setResultString] = useState<string>();
  const [voter, setVoter] = useState<
    Voter & {
      student: {
        voter: Voter | null;
        candidate: Candidate | null;
        FirstName: string;
        SirName: string;
      };
    }
  >();
  const mutation = trpc.useMutation("voter.registerVoter");
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
    mutation.mutateAsync({ accessToken: token }).then((res) => {
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
        console.log(res.result);
      });
  };
  const { isLoading,data } = trpc.useQuery(["voter.isVoter", { accessToken: token! }], {
    onSuccess(data) {
      if (data.existence == null) {
        setIsVoter(false);
      }
      if (data.voter) {
        if (data.voter.student.candidate !== null) {
          setIsCandidate(true);
        }
        setIsVoter(true);
        setVoter(data.voter);
      }
    },
  });
  console.log(data);
  return (
    <Layout>
      <div
        data-theme="garden"
        className="grid grid-cols-1 place-items-center h-screen "
      >
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {voter?.student.FirstName} {voter?.student.SirName}
                      </td>
                      <td>{voter?.student.candidate?.CandidateId}</td>
                      <td>{voter?.student.candidate?.PositionName}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            {isCanditate && (
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Update manisfesto</h2>
                  <textarea
                    className="textarea"
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
                      update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
