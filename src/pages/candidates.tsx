import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
//TODO display candidates
const Candidates: NextPage = () => {
  const [candidates, setCandidates] = useState<{
    positions: string[];
    candidatesArr: string[];
  }>();
  useEffect(() => {
    setCandidates({
      positions: ["preisdent", "vice president"],
      candidatesArr: ["john", "james"],
    });
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center h-screen">
        {candidates?.positions}
      </div>
    </Layout>
  );
};
export default Candidates;
