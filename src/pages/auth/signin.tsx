import { NextPage } from "next";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { off } from "process";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
//TODO document
type formInput = {
  studentNo: number;
  password: string;
};
const SignIn: NextPage = () => {
  const [displayToast, setDisplayToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();
  const mutation = trpc.useMutation("auth.signin");
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);
  const onSubmit: SubmitHandler<formInput> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    mutation
      .mutateAsync({ studentNo: data.studentNo, password: data.password })
      .then((res) => {
        if (res.accessToken) {
          sessionStorage.setItem("token", res.accessToken);
          router.push("/");
        } else {
          setToastMessage(res.result);
          setDisplayToast(true);
        }
      });
  };
  return (
    <div data-theme="garden" className="h-screen grid place-content-center">
      <span className="justify-self-center font-bold ">Sign In</span>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label">
          <span className="label-text">student number</span>
          {errors.studentNo && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>Number</span>

          <input
            {...register("studentNo", { required: true, valueAsNumber: true })}
            type="number"
            placeholder="12345"
            className="input input-bordered"
          />
        </label>
        <label className="label">
          <span className="label-text">password</span>
          {errors.password && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>password</span>

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="**********"
            className="input input-bordered"
          />
        </label>
        <button type="submit" className="m-5 btn btn-active btn-primary">
          submit
        </button>
      </form>

      <Link href="/auth/signup">
        <a className="link">Not registered as a Student? Sign Up</a>
      </Link>
      {displayToast && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
