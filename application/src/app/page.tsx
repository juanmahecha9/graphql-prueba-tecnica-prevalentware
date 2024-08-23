"use client"

import React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";

const AUTH_QUERY = gql`
  query Auth($email: String!, $password: String!) {
    auth(auth: { email: $email, password: $password }) {
      token
      id
      role
    }
  }
`;
const Home: React.FC = () => {


  const router = useRouter(); // redireccionar al usuario
  const [client] = useState(() => createApolloClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState<boolean>(false); // Inicializa el modal en cerrado

  const { data, loading, error, refetch } = useQuery(AUTH_QUERY, {
    client,
    variables: { email, password },
    skip: true, // Skip initial fetch
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await refetch({ email, password });
      console.log(data); // Aquí obtendrás la respuesta de la consulta GraphQL

      // Maneja la redirección o el estado basado en la respuesta
      if (
        data?.auth?.token == "N/A" ||
        data?.auth?.role == "N/A" ||
        data?.auth?.id == "N/A"
      ) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 5000)
        return
      }

      localStorage.setItem('token', data?.auth?.token)
      localStorage.setItem('role', data?.auth?.role)
      localStorage.setItem('id', data?.auth?.id)

      router.push('/home')



    } catch (e: any) {
      console.error('Error during authentication:', e);
      if (e.networkError) {
        console.error('Network error:', e.networkError.message);
      }
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach((error: any) => {
          console.error('GraphQL error:', error.message);
        });
      }
    } finally {
      console.log('Request login!');
    }
  };


  return (
    <main className="h-screen flex flex-col items-center justify-center">

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Inicio de sesión</h1>
          <div className="flex justify-center items-center">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {
        isError ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Inicio de sesión Erroneo</span> Intente nuevamente!.
          </div>
        ) :
          <></>
      }
    </main>
  );
};

export default Home;
