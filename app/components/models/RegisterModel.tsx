"use client";

import React, { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import axios from "axios";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModel from "@/app/hooks/useLoginModel";

const RegisterModel = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [isLoading, setIsLoading] = useState(false);
  interface MyFieldValue {
    name: string;
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
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<MyFieldValue> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        loginModel.onOpen();
        registerModel.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModel.onClose();
    loginModel.onOpen();
  }, [loginModel, registerModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an Account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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
      {/* //make sure that the account using in github is not exist in databse as a
      register account */}
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Already Have an Account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Model
        onClose={registerModel.onClose}
        isOpen={registerModel.isOpen}
        disabled={isLoading}
        title="Register"
        actionLabel="Continue"
        body={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModel;
