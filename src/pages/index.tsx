import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import Head from "next/head";

const Initial: NextPage = () => {
  const [errorLogin, setErrorLogin] = useState<boolean | null>(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
    });
  };

  function tst() {
    if (errorLogin == true) {
      return <h3 className="text-red-500">Email ou senha incorretos</h3>;
    }
  }

  return (
    <>
      <Head>
        <title>Desafio Open Banking</title>
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <video
        className="flex absolute w-screen h-screen object-cover grayscale"
        autoPlay
        muted
        loop
      >
        <source
          src="http://www.georgewpark.com/video/blurred-street.mp4"
          type="video/mp4"
        />
        <source
          src="http://www.georgewpark.com/video/blurred-street.webm"
          type="video/webm"
        />
      </video>
      <div className="flex flex-col absolute w-screen h-screen justify-center items-center ">
        <div className="flex h-3/4 w-4/5 lg:w-2/4 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 shadow-xl bg-white">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/assets/images/logo_login.png"
                alt="teros"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Fazer Login
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                {tst()}
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full bg-gray-200 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full bg-gray-200 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Entrar
                </button>
                <button
                  type="button"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => signIn("github")}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={faGithub} className="text-xl" />
                  </span>
                  Login com Github
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Initial;
