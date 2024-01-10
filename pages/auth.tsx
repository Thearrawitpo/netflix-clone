/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props = {};

export default function Auth({}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant: string) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        // redirect: false,
        callbackUrl: "/",
      });
      // router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpg')] 
    bg-cover bg-fixed bg-center bg-no-repeat"
    >
      <div className='h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div
            className='mt-2 w-full self-center rounded-md bg-black 
          bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md'
          >
            <h2 className='mb-8 text-4xl font-semibold text-white'>
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === "register" && (
                <Input
                  id='name'
                  value={name}
                  label='Username'
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id='email'
                value={email}
                type='email'
                label='Email'
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id='password'
                value={password}
                type='password'
                label='Password'
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <button
                onClick={variant === "login" ? login : register}
                className='mt-10 w-full rounded-md bg-red-600 py-3 text-white
              transition hover:bg-red-700'
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>

              <div className='mt-8 flex flex-row items-center justify-center gap-4'>
                <div
                  className='
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-white
                transition
                hover:opacity-80'
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  className='
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-white
                transition
                hover:opacity-80'
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                >
                  <FaGithub size={30} />
                </div>
              </div>

              <p className='mt-12 text-neutral-500'>
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className='ml-1 cursor-pointer text-white hover:underline'
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
