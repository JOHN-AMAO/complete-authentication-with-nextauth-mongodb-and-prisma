/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/v4Y0INx5N02
 */
"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export function AuthForm() {
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const session = useSession();
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    if (variant === "REGISTER") {
      setVariant("LOGIN");
    } else {
      setVariant("REGISTER");
    }
  }, [variant]);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("authenticated");
      router.push("/posts");
    }
  }, [session, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("something went wrong"));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback: any) => {
        console.log("Sign in response", callback);
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Sucess");
          router.push("/posts");
        }
      });
    }
  };

  return (
    <div className='min-h-screen bg-black flex justify-center items-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8'>
        <div className='space-y-6'>
          <h2 className='text-center text-3xl font-extrabold text-gray-900'>
            {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
          </h2>
          <div className='flex justify-center items-center '>
            <div className='flex justify-end bg-gray-700 text-white px-12 py-2 rounded shadow-lg'>
              <Button
                className={` mr-6 ${variant === "LOGIN" && "bg-black"} px-6`}
                variant='ghost'
                onClick={() => setVariant("LOGIN")}
              >
                Login
              </Button>
              <Button
                className={` ml-6 ${variant === "REGISTER" && "bg-black"} px-6`}
                variant='ghost'
                onClick={() => setVariant("REGISTER")}
              >
                Register
              </Button>
            </div>
          </div>
          <p className='mt-2 text-center font-semibold text-sm text-black'>
            Fill the form to use xHangout
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-8 space-y-6'
          >
            {variant === "REGISTER" && (
              <Input
                type='text'
                id='name'
                label='Username'
                register={register}
              />
            )}
            <Input
              type='text'
              id='email'
              label='Email'
              register={register}
            />
            <Input
              type='password'
              id='password'
              label='Password'
              register={register}
            />
            <div className='rounded-md shadow-sm -space-y-px'></div>
            <div>
              <Button className='w-full p-5 bg-purple-900'>
                {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
              </Button>
            </div>
          </form>
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-semibold text-black'>
                Additional options:
              </h3>
            </div>
            <Button
              className='w-full flex justify-center bg-violet-900 items-center space-x-2'
              variant='outline'
              onClick={() => socialAction("google")}
            >
              <ChromeIcon className='w-5 h-5 text-black' />
              <span>
                {variant === "LOGIN"
                  ? "Log in with Google"
                  : "Sign up with Google"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
const socialAction = (action: string) => {
  signIn(action, { redirect: false }).then((callback) => {
    if (callback?.error) {
      toast.error("Invalid request");
    }
    if (callback?.ok && !callback.error) {
      toast.success("Successully Logged IN");
    }
  });
};

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
      />
      <circle
        cx='12'
        cy='12'
        r='4'
      />
      <line
        x1='21.17'
        x2='12'
        y1='8'
        y2='8'
      />
      <line
        x1='3.95'
        x2='8.54'
        y1='6.06'
        y2='14'
      />
      <line
        x1='10.88'
        x2='15.46'
        y1='21.94'
        y2='14'
      />
    </svg>
  );
}
