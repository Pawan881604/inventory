"use client";
import { FbIcon } from "@/components/common/svg-icons/fb_icon";
import { GoogleIcon } from "@/components/common/svg-icons/google_icon";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import { useSign_up_userMutation } from "@/state/usersApi";
import type { Sign_up } from "@/types/auth_type";
import { sign_up_schema } from "@/zod-schemas/auth_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const Sign_up = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Sign_up>({ resolver: zodResolver(sign_up_schema) });
  const [sign_up_user, { data, isLoading, error, isSuccess }] =
    useSign_up_userMutation();

  const onSubmit = async (data: Sign_up) => {
    const user_data: Sign_up = { ...data, uuid: generate32BitUUID() };
    await sign_up_user(user_data).unwrap(); // Call the mutation with data
  };
  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage); // Show the error toast
    }
    if (isSuccess) {
      router.push("/auth/sign-in");
      toast.success("User creates successfully"); // Show the error toast
    }
  }, [error, isSuccess]);

  return (
    <div className="bg-light_color min-h-screen">
      <div className="flex justify-center items-center max-w-sm m-auto min-h-screen">
        <div className="bg-white w-full p-6 py-50 rounded-lg">
          <div className="my-6">
            <h1 className="text-3xl text-center">Welcome back</h1>
            <p className="text-base text-center">
              please enter your details to sign in.
            </p>
          </div>
          <div className="flex items-center justify-center mb-5">
            <div className="w-1/2 text-center">
              <Button
                variant="light"
                isIconOnly
                aria-label="google"
                className="w-32 border border-gray-100"
              >
                <GoogleIcon />
              </Button>
            </div>
            <div className="w-1/2 text-center">
              <Button
                variant="light"
                isIconOnly
                aria-label="fb"
                className="w-32 border border-gray-100"
              >
                <FbIcon />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 mb-5">
            <hr className="w-2/5" aria-hidden="true" />
            <span>Or</span>
            <hr className="w-2/5" aria-hidden="true" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    aria-label="name"
                    placeholder="Enter your full name"
                    variant="bordered"
                    label="Name"
                    isInvalid={!!errors.name}
                    color={errors.name ? "danger" : "default"}
                    fullWidth
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    aria-label="email"
                    placeholder="Enter your email"
                    variant="bordered"
                    label="Email"
                    isInvalid={!!errors.email}
                    color={errors.email ? "danger" : "default"}
                    fullWidth
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                    color={errors.password ? "danger" : "default"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    fullWidth
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex justify-center my-6">
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-black text-white w-full"
              >
                Sign up
              </Button>
            </div>
            <div className="text-end">
              <p>
                Have an account?{" "}
                <Link href={"/auth/sign-in"} className="text-base text-black">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;