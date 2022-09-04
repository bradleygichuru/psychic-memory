import { NextPage } from "next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
//TODO document
type FormValues = {
  studentNo: number;
  firstName: string;
  sirName: string;
  email: string;
  facualty: string;
  yearOfStudy: number;
  password: string;
  course: string;
  displayName:string;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [displayToast, setDisplayToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const mutation = trpc.useMutation("auth.signup");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    mutation
      .mutateAsync({
        studentNo: data.studentNo,
        firstName: data.firstName,
        sirName: data.sirName,
        email: data.email,
        facualty: data.facualty,
        yearOfStudy: data.yearOfStudy,
        password: data.password,
        course: data.course,
        displayName:data.displayName,
      })
      .then((res) => {
        console.log(res);

        setToastMessage(res?.result!);
        setDisplayToast(true);
        if (res?.accessToken) {
          sessionStorage.setItem("token", res.accessToken);
          router.push("/");
        }
        if (res?.result == "student alrealdy exist") {
          router.push("/auth/signin");
        }
      });
  };

  return (
    <div
      data-theme="garden"
      className="h-screen grid place-items-center overflow-scroll p-4"
    >
      <div>
        <span className="justify-self-center mx-auto container grid font-bold my-5 text-primary">
          Sign Up
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full max-w-xs "
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
          <span className="label-text">FirstName</span>
          {errors.firstName && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>name</span>
          <input
            {...register("firstName", { required: true })}
            type="text"
            placeholder="John"
            className="input input-bordered"
          />
        </label>
        <label className="label">
          <span className="label-text">Display Name</span>
          {errors.displayName && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>name</span>
          <input
            {...register("displayName", { required: true })}
            type="text"
            placeholder="coolname"
            className="input input-bordered"
          />
        </label>

        <label className="label">
          <span className="label-text">Sirname</span>
          {errors.sirName && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>name</span>
          <input
            {...register("sirName", { required: true })}
            type="text"
            placeholder="Doe"
            className="input input-bordered"
          />
        </label>

        <label className="label">
          <span className="label-text">Your Email</span>
          {errors.email && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>Email</span>
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="info@site.com"
            className="input input-bordered"
          />
        </label>
        <label className="label">
          <span className="label-text">facualty</span>
          {errors.facualty && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>name</span>
          <input
            {...register("facualty", { required: true })}
            type="text"
            placeholder=""
            className="input input-bordered"
          />
        </label>
        <label className="label">
          <span className="label-text">Year of study</span>
          {errors.yearOfStudy && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>

        <label className="input-group font-bold ">
          <span>Year</span>

          <input
            {...register("yearOfStudy", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            placeholder="2019"
            className="input input-bordered"
          />
        </label>

        <label className="label">
          <span className="label-text">course</span>
          {errors.course && (
            <span className="label-text-alt text-red-900">
              This field is required
            </span>
          )}
        </label>
        <label className="input-group font-bold">
          <span>name</span>
          <input
            {...register("course", { required: true })}
            type="text"
            placeholder="Bachelor in Science Business Information Technology"
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
      <Link href="/auth/signin">
        <a className="link">Already a Student? Sign In</a>
      </Link>

      {displayToast && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>{toastMessage}.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
