import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Table from "../../components/table/table";
import { Fragment, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { VarContext } from "../../context/context";
import Head from "next/head";

const userNavigation = [{ name: "Sign out", href: "#" }];

const Dashboard: NextPage = (data) => {
  const { data: session } = useSession();

  function logOff() {
    signOut({
      callbackUrl: "/",
    });
  }

  return (
    <>
      <Head>
        <title>Desafio Open Banking</title>
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-md">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-auto"
                        src="/assets/images/logo_login.png"
                        alt="Teros"
                      />
                    </div>
                    <div className="hidden md:block"></div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu
                        as="div"
                        className={session ? "relative ml-3" : "hidden"}
                      >
                        <div>
                          <Menu.Button
                            className={
                              !session
                                ? "hidden"
                                : "flex gap-2 max-w-xs items-center rounded-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-900"
                            }
                          >
                            <h1 className="text-black">
                              {session?.user?.name}
                            </h1>

                            <img
                              className="h-8 w-8 rounded-full"
                              src={session?.user?.image?.toString()}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className={
                              !session
                                ? "hidden"
                                : "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-100 py-1 shadow-sm ring-1 ring-cyan-300 ring-opacity-5 focus:outline-none"
                            }
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    onClick={() => logOff()}
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={session?.user?.image?.toString()}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-600">
                        {session?.user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {session?.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        onClick={() => logOff()}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="flex flex-col h-full justify-center items-center p-4 md:px-10">
            <Table session={session} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
