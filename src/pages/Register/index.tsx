import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    await fetch("/api/users/users", {
      method: "POST",
      body: JSON.stringify(data),
    });

    router.push("./");
  };

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
                Criar nova conta
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm gap-2">
                <div>
                  <h1>Nome:</h1>
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="relative block w-full bg-gray-200 appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="ex: João"
                  />
                </div>
                <div>
                  <h1>Email:</h1>
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full bg-gray-200 appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="exemplo@email.com"
                  />
                </div>
                <div>
                  <h1>Senha:</h1>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full bg-gray-200 appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-900 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cadastre-se
                </button>
                <Link href="./">
                  <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-900 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Já tem uma conta?
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
