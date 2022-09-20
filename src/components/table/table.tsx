import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { VarContext } from "../../context/context";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Modal from "../modal/modal";
import { useForm } from "react-hook-form";

export function BackLogin() {
  return (
    <div className="flex flex-col w-full pt-24 gap-4 items-center justify-center">
      <img
        className="mx-auto h-12 w-auto"
        src="/assets/images/logo_login.png"
        alt="teros"
      />
      <h1>Ops, parece que você não está logado</h1>
      <div className="w-1/6">
        <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Link href="./"> Fazer Login</Link>
        </button>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div aria-label="Loading..." role="status">
        <svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

const Table = (props: any): JSX.Element => {
  const { setModalState, setInfo } = useContext(VarContext);

  const [open, setOpen] = useState(false);
  const url = "/api/participantes/participantes";

  function modal(
    CustomerFriendlyDescription: string,
    RegistrationNumber: string,
    RegistrationId: string,
    Address: string,
    City: string,
    Postcode: string,
    Country: string,
    OrganisationName: string,
    RegisteredName: string,
    Status: string,
    Image: string
  ) {
    setInfo([
      OrganisationName,
      RegisteredName,
      Status,
      CustomerFriendlyDescription,
      RegistrationNumber,
      RegistrationId,
      Address,
      City,
      Postcode,
      Country,
      Image,
    ]);
    setModalState(true);
  }
  const [dataLength, setDataLength] = useState<Number | null | undefined>();
  const { data, error } = useSWR(
    url,
    async (url) => {
      const response = await axios.get(url);
      const data = await response.data;
      setDataLength(data.data.length);

      return data;
    },
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const [n, setN] = useState(0);
  const [initialPosition, setinitialPosition] = useState(0);
  const [finalyPosition, setfinalyPosition] = useState(10);

  function nextPage() {
    if (dataLength) {
      if (finalyPosition < dataLength) {
        setfinalyPosition(finalyPosition + 10);
        setinitialPosition(initialPosition + 10);
      }
    }
  }
  function backPage() {
    if (initialPosition > 0 && finalyPosition > 0) {
      setfinalyPosition(finalyPosition - 10);
      setinitialPosition(initialPosition - 10);
    }
  }
  //------------------------------------pesquisar
  const [inputState, setInput] = useState<string | null>();
  const { register, handleSubmit } = useForm();
  const onSubmit = (input) => {
    setfinalyPosition(data.data.length);
    setinitialPosition(0);
    search(input);
  };

  function search(dataInput: string) {
    const input: string = dataInput.search
      .toString()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // texto escrito

    setInput(input);
    if (input.trim() == "") {
      setfinalyPosition(10);

      setInput(null);
    }
  }

  if (!props.session) return BackLogin();
  if (error) return <h1>Sem resultados da api</h1>;
  if (!data) return Loading();

  return (
    <div className="flex flex-col justify-center">
      <Modal />

      <div className="min-h-screen w-screen px-4 md:px-12">
        <div className="p-2 md:p8">
          <form onSubmit={handleSubmit(onSubmit)} className=" my-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-300 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                {...register("search")}
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="Search Mockups, Logos..."
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-cyan-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-900 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="bg-white rounded-lg shadow-lg overflow-auto">
            <table className="table-auto w-full ">
              <thead className="bg-cyan-800 text-white shadow-lg text-sm md:text-sm lg:text-md">
                <tr>
                  <th className="py-3 px-2 text-center justify-center md:justify-start gap-2 flex">
                    <span className="hidden md:flex w-32"></span> Nome da
                    Empresa
                  </th>
                  <th className="py-3 px-2 text-left">Url discovery</th>

                  <th className="py-3 px-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((info: any, i: Number | any) => {
                  if (inputState) {
                    if (
                      info.OrganisationName.toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .includes(inputState) == true
                    ) {
                      return (
                        <tr
                          id={info.OrganisationName}
                          className={
                            i % 2 == 0
                              ? " bg-gray-100 hover:bg-slate-200 text-sm md:text-md lg:text-md"
                              : "bg-white hover:bg-slate-200 text-sm md:text-md lg:text-md"
                          }
                          key={i}
                        >
                          <td className="px-2 py-3 flex flex-col justify-start items-center gap-2 md:h-24 md:flex-row">
                            <div className="hidden md:flex w-32 h-3/4">
                              <img
                                src={
                                  info.AuthorisationServers[0]
                                    .CustomerFriendlyLogoUri
                                }
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <strong>
                              {info.OrganisationName.toUpperCase()}
                            </strong>
                          </td>
                          <td className="px-2 py-3 ">
                            <a
                              href={
                                info.AuthorisationServers[0]
                                  .OpenIDDiscoveryDocument
                              }
                              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              DOC
                            </a>
                          </td>

                          <td className="px-2 py-3 text-center">
                            <button
                              onClick={() =>
                                modal(
                                  info.AuthorisationServers
                                    .CustomerFriendlyDescription,
                                  info.RegistrationNumber,
                                  info.RegistrationId,
                                  info.Address,
                                  info.City,
                                  info.Postcode,
                                  info.Country,
                                  info.OrganisationName,
                                  info.RegisteredName,
                                  info.Status,
                                  info.AuthorisationServers[0]
                                    .CustomerFriendlyLogoUri
                                )
                              }
                              className="hover:bg-gray-300 hover:text-sky-500 p-1 px-2 font-bold rounded-lg focus:outline-none"
                            >
                              Ver mais
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  }
                  if (!inputState) {
                    if (i <= finalyPosition && i >= initialPosition) {
                      return (
                        <tr
                          id={info.OrganisationName}
                          className={
                            i % 2 == 0
                              ? " bg-gray-100 hover:bg-slate-200 text-sm md:text-md lg:text-md"
                              : "bg-white hover:bg-slate-200 text-sm md:text-md lg:text-md"
                          }
                          key={i}
                        >
                          <td className="px-2 py-3 flex flex-col justify-start items-center gap-2 md:h-24 md:flex-row">
                            <div className="hidden md:flex w-32 h-3/4">
                              <img
                                src={
                                  info.AuthorisationServers[0]
                                    .CustomerFriendlyLogoUri
                                }
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <strong>
                              {info.OrganisationName.toUpperCase()}
                            </strong>
                          </td>
                          <td className="px-2 py-3 ">
                            <a
                              href={
                                info.AuthorisationServers[0]
                                  .OpenIDDiscoveryDocument
                              }
                              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              DOC
                            </a>
                          </td>

                          <td className="px-2 py-3 text-center">
                            <button
                              onClick={() =>
                                modal(
                                  info.AuthorisationServers
                                    .CustomerFriendlyDescription,
                                  info.RegistrationNumber,
                                  info.RegistrationId,
                                  info.Address,
                                  info.City,
                                  info.Postcode,
                                  info.Country,
                                  info.OrganisationName,
                                  info.RegisteredName,
                                  info.Status,
                                  info.AuthorisationServers[0]
                                    .CustomerFriendlyLogoUri
                                )
                              }
                              className="hover:bg-gray-300 hover:text-sky-500 p-1 px-2 font-bold rounded-lg focus:outline-none"
                            >
                              Ver mais
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => backPage()}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando
              <span className="font-medium">{initialPosition + 1}</span> de
              <span className="font-medium">{finalyPosition}</span> de
              <span className="font-medium">{data.data.length}</span> Resultados
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => backPage()}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>

              <button
                onClick={() => nextPage()}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
