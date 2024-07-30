"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { schema } from "./schema";
import { HashLoader } from "react-spinners";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    if (Object.keys(errors)?.length > 0) {
      toast.error("Enter valid data");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      console.log("signIn response:", res);
      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("Email or password is invalid");
      }
    } catch (error) {
      console.log("Error during signIn:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="px-5 lg:px-0 mt-[60px]">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-8 bg-white">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-blue-500">Welcome</span> Back 👻
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              required
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password Here"
              name="password"
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              required
              {...register("password")}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-blue-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex items-center justify-center"
            >
              {isLoading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link href='/signup' className='text-primaryColor font-medium ml-1 text-blue-600'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
