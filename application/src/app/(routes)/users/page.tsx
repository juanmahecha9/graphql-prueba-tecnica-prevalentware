"use client";
import { gql, useQuery } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserModal from '@/components/userModal';
import { FiUser, FiUserPlus } from 'react-icons/fi';
import * as crypto from 'crypto';
import AppNavigation from "@/partial/navigation";

const USERS_QUERY = gql`
  query {
    findAllUsers {
      id
      name
      email
      phone
      role
    }
  }
`;

const roleCrypto = (role: string) => {
  const _role = btoa(role).concat('??').concat('nestjs_app');
  const hash = crypto.createHash('sha256');
  hash.update(_role);
  return hash.digest('hex');
}

export default function User() {
  const router = useRouter();
  const checkAuthorization = () => {
    // Implementa la lógica para verificar si el usuario está autorizado
    const role = localStorage.getItem('role');
    return role === roleCrypto('admin'); // Ejemplo de verificación
  };
  useEffect(() => {
    const isAuthorized = checkAuthorization();

    if (!isAuthorized) {
      //window.location.href = '/'; // Redirige al usuario
      //alert('Usuario no autorizado')
      router.push('/')
    }
  }, []);



  const [client] = useState(() => createApolloClient());
  const [modalClosed, setModalClosed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery(USERS_QUERY, { client, skip: modalClosed });

  useEffect(() => {
    if (modalClosed) {
      refetch();
      setModalClosed(false);
    }
  }, [modalClosed, refetch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setModalClosed(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <main className="p-5 h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.findAllUsers && data.findAllUsers.length > 0 ? (
            data.findAllUsers.map((user: { id: string; name: string, role: string, phone: string, email: string }) => (
              <a
                key={user.id}
                href={`/users/${user.id}`}
                className="relative block max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 text-gray-900 hover:bg-yellow-300"
              >
                <div className="flex justify-center items-center mb-4">
                  <FiUser className="text-lg" style={{ fontSize: '3rem' }} />
                </div>
                <h5 className="text-xl font-semibold text-gray-900 ">{user.name}</h5>
                <p className="text-gray-600 dark:text-gray-700">
                  Usuario de tipo <b>{user.role}</b>, identificado con el correo <b>{user.email}</b> con número telefónico <b>{user.phone}</b>
                </p>
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-1  transition-opacity duration-300">
                  Clic para editar
                </span>
              </a>
            ))
          ) : (
            <h1>No hay Usuarios disponibles</h1>
          )}
        </div>
        <button
          onClick={openModal}
          className="fixed top-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          aria-label="Agregar usuario"
        >
          <FiUserPlus style={{ fontSize: '1.5rem' }} />
        </button>
      </main>
      <UserModal isOpen={isModalOpen} onClose={closeModal} />

    </>
  );
}
