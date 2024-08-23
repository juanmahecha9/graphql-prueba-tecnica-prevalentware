// components/Modal.tsx

import React, { useEffect, useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";

// Definir la mutación GraphQL
const CREATE_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $phone: String!, $role: String!, $password: String!) {
    createNewUser(createUser: {
      name: $name
      email: $email
      phone: $phone
      role: $role
      password: $password
    }) {
      name
      email
      role
    }
  }
`;

// Definir los props del componente Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("admin");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password] = useState("1234"); // Definido como constante ya que no cambia

    // Estado para el cliente Apollo
    const [createUser, { data, loading, error }] = useMutation(CREATE_MUTATION, {
        client: createApolloClient(),
    });

    // Efecto para manejar el cierre del modal
    useEffect(() => {
        if (!isOpen) {
            setName('');
            setPhone('');
            setEmail('');
            setRole('admin');
        }
    }, [isOpen]);

    // Manejar el envío del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data } = await createUser({
                variables: {
                    name,
                    email,
                    phone,
                    role,
                    password
                }
            });

            console.log('User created:', data);
            onClose();
        } catch (e: any) {
            console.error("Error during authentication:", e);
            if (e.networkError) {
                console.error("Network error:", e.networkError.message);
            }
            if (e.graphQLErrors) {
                e.graphQLErrors.forEach((error: any) => {
                    console.error("GraphQL error:", error.message);
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-700 p-6 rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Agregar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-100">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">Correo</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-100">Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-100">Rol</label>
                        <select
                            id="role"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 col-span-4 gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                            type="button"
                            className="bg-red-700 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-4 text-red-500">Error: {error.message}</p>
                )}
            </div>
        </div>
    );
};

export default UserModal;
