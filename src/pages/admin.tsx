import { router } from "@trpc/server";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";
//TODO document
const Admin: NextPage = () => {
  //TODO prevent candidates from being added before positions are created
 
  const [adminName, setIsAdminName] = useState<string>();
  const [showToast,setShowToast] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<number>();
  const [candIsDisabled, setCandIsDisabled] = useState<boolean>(false);
  const [posIsDisabled, setPosIsDisabled] = useState<boolean>(false);
  const [positionName, setPositionName] = useState<string>();
  const [adminPassword, setAdminPassword] = useState<string>();
  const [posDescription, setPosDescription] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const mutationAdmin = trpc.useMutation("auth.isAdmin");
  const mutationCandidate = trpc.useMutation("candidate.addCandidate");
  const mutationPosition = trpc.useMutation("candidate.addPosition");
  const router = useRouter();
  const handleAddCandidate = () => {
    mutationCandidate
      .mutateAsync({ posName: positionName!, studentNo: studentId! })
      .then((data) => {
        if (data.candidate) {
          setStatus("candidate added");
          console.log(data.candidate);
        } else {
          setStatus(data.result);
          console.log(data.result);
        }
      });
  };
  const handleAddPosition = () => {
    mutationPosition
      .mutateAsync({ posName: positionName!, posDescription: posDescription! })
      .then((data) => {
        if (data.position) {
          setStatus("position added sucessfully")
          console.log("position added sucessfully");
        } else {
          setStatus(data.result)
          console.log(data.result);
        }
      });
  };
  const handleSignIn = () => {
    mutationAdmin
      .mutateAsync({ password: adminPassword!, adminName: adminName! })
      .then((data) => {
        console.log(data);
        if (data?.existence) {
          setStatus("error signing in");
        }
        if (data?.token) {
          
          setStatus("Success signing in");
          setShowToast(true);
          sessionStorage.setItem("adminToken", data.token);
          setTimeout(()=>{
            setShowToast(false);
            router.push("/admin");
          },2000)
         
        }
      });
  };
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, [status]);
  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center h-screen">
        <div className="grid card-title m-3">
          <h2 className="justify-self-center text-primary">Admin Panel</h2>
        </div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          {isAdmin && (
            <div
              className="card-body mb-1"
              onClick={() => {
                if (posIsDisabled == false) {
                  setCandIsDisabled(false);
                  setPosIsDisabled(true);
                }
              }}
            >
              <h2 className="card-title">Add candidate</h2>
              <input
                type="number"
                placeholder="student no"
                onChange={(e) => {
                  setStudentId(e.target.valueAsNumber);
                }}
                className="input w-full input-bordered max-w-xs"
              />
              <input
                type="text"
                placeholder="position name "
                onChange={(e) => {
                  setPositionName(e.target.value);
                }}
                className="input w-full input-bordered max-w-xs"
              />

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={candIsDisabled}
                  onClick={() => {
                    handleAddCandidate();
                  }}
                >
                  register
                </button>
              </div>
            </div>
          )}
          {isAdmin && (
            <div
              className="card-body mb-1"
              onClick={() => {
                if (candIsDisabled == false) {
                  setPosIsDisabled(false);
                  setCandIsDisabled(true);
                }
              }}
            >
              <h2 className="card-title">Add Position</h2>

              <input
                type="text"
                placeholder="position name "
                className="input w-full input-bordered max-w-xs"
                onChange={(e) => {
                  setPositionName(e.target.value);
                }}
              />
              <textarea
                className="textarea textarea-bordered"
                placeholder="position description"
                onChange={(e) => {
                  setPosDescription(e.target.value);
                }}
              />
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={posIsDisabled}
                  onClick={(e) => {
                    handleAddPosition();
                  }}
                >
                  add
                </button>
              </div>
            </div>
          )}
          {!isAdmin && (
            <>
              <span className="justify-self-center font-bold m-4">
                Admin Sign In
              </span>
              <div className="form-control m-4">
                <label className="label">
                  <span className="label-text">Admin number</span>
                </label>
                <label className="input-group">
                  <span>number</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    onChange={(e) => {
                      setIsAdminName(e.target.value);
                    }}
                  />
                </label>
                <label className="label">
                  <span className="label-text">Admin Password</span>
                </label>
                <label className="input-group">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="****"
                    className="input input-bordered"
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                    }}
                  />
                </label>
                <button
                  className="btn btn-primary m-4"
                  onClick={() => {
                    handleSignIn();
                  }}
                >
                  {" "}
                  Signin
                </button>
              </div>
            </>
          )}
        </div>

       {showToast&& <div className="toast toast-top">
          <div className="alert alert-info">
            <div>
              <span>{status}</span>
            </div>
          </div>
          
        </div>}
      </div>
    </Layout>
  );
};
export default Admin;
