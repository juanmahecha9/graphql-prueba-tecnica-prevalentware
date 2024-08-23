"use client";

import { gql, useQuery } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import ModalMovement from "@/components/movementModal";
import AppNavigation from "@/partial/navigation";


const MOVEMENT_QUERY = gql`
  query {
    findAllMovements {
      concept
      amount
      date
      userId
      id
      userName
      type
    }
  }
`;

export default function Users() {
  const [client] = useState(() => createApolloClient());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalClosed, setModalClosed] = useState(false);
  const { data, loading, error, refetch } = useQuery(MOVEMENT_QUERY, { client, skip: modalClosed });
  const router = useRouter();

  useEffect(() => {
    if (modalClosed) {
      refetch();
      setModalClosed(false);
    }
  }, [modalClosed, refetch]);

  if (loading) return <div><p className="text-center py-4">Loading...</p></div>;
  if (error) return <div><p className="text-center py-4 text-red-500">Error: {error.message}</p></div>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setModalClosed(true);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-5 bg-gradient-to-r from-blue-500 to-teal-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.findAllMovements && data.findAllMovements.length > 0 ? (
            data.findAllMovements.map((m: { amount: string; id: string; userId: string; concept: string; date: string; userName: string; type: string }) => (
              <div key={m.id} className="relative block max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 text-gray-900 hover:bg-yellow-300">
                <div className="flex justify-center items-center mb-4">
                  <FaMoneyBillTransfer className="text-lg" style={{ fontSize: '3rem' }} />
                </div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                  {m.concept}
                </h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Monto: {m.amount}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Tipo de movimiento: {m.type}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Fecha: {m.date.split('T')[0]}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Generado por: {m.userName}
                </p>
              </div>
            ))
          ) : (
            <h1 className="text-center text-gray-500 dark:text-gray-400">No hay movimientos disponibles</h1>
          )}
        </div>
      </main>

      {/* Botón flotante para abrir el modal */}
      <button
        onClick={openModal}
        className="fixed top-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>


      <ModalMovement isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
