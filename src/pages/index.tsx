import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Initial: NextPage = () => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
    });
  };

  useEffect(() => {
    if (
      router.asPath == "/?error=Password%20doesnt%20match" ||
      router.asPath == "/?error=No%20user%20found%20with%20the%20email"
    ) {
      setError(true);
    }
  }, []);

  function loginFall() {
    if (error == true) {
      return <h2 className="text-red-900"> Email ou senha incorretos</h2>;
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
              {loginFall()}
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    exemplo@email.com
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full bg-gray-200 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="exemplo@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full bg-gray-200 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-900 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-cyan-700 group-hover:text-cyan-600"
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
                  className="group relative flex w-full justify-center rounded-md border border-transparent fill-gray-600  hover:fill-gray-500 bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => signIn("github")}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  Login com Github
                </button>
                <Link href="./Register">
                  <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-900 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Criar nova conta
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

export default Initial;
