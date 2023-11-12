"use client";

import React, { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import useLoginModel from "@/app/hooks/useLoginModel";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import axios from "axios";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModel = () => {
  const router = useRouter();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);
  interface MyFieldValue {
    email: string;
    password: string;
  }
  //maybe i need to change MyFieldvalue interface to FieldValue
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFieldValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<MyFieldValue> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Successfully logged in");
        router.refresh();
        loginModel.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subTitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Dont have an accout?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create Now
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Model
        onClose={loginModel.onClose}
        isOpen={loginModel.isOpen}
        disabled={isLoading}
        title="Login"
        actionLabel="Continue"
        body={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModel;
