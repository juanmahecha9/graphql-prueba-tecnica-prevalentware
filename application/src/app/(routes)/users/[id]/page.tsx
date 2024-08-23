"use client";
import { useMutation, useQuery, gql } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as crypto from 'crypto';
import AppNavigation from "@/partial/navigation";


const USER_QUERY = gql`
  query($id: String!) {
    findUserById(id: $id) {
      name
      id
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
const UPDATE_USER = gql`
  mutation($id: String!, $name: String!, $email: String!, $phone: String!, $role: String!) {
    updateUser(updateUser: {
      id: $id
      name: $name
      email: $email
      phone: $phone
      role: $role
    }) {
      name
    }
  }
`;

export default function UserDetails() {
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

    const { id } = useParams();
    const [client] = useState(() => createApolloClient());
    const [showEditForm, setShowEditForm] = useState<boolean>(false);

    // Estados del formulario
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const { data, loading, error, refetch } = useQuery(USER_QUERY, {
        client,
        variables: { id },
        skip: !id,
    });

    const [updateUser, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_USER, {
        client,
        onCompleted: () => {
            refetch(); // Refetch the data after mutation completes
            setShowEditForm(false); // Optionally hide the form
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        },
    });

    const user = data?.findUserById;

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setRole(user.role || "");
        }
    }, [user]);

    const showForm = () => setShowEditForm(true);
    const hideForm = () => setShowEditForm(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateUser({
                variables: {
                    id,
                    name,
                    email,
                    phone,
                    role,
                },
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (error) router.push("/users");
    if (loading) return <div>
        <p>Loading...</p>

    </div>;

    return (
        <div className="p-5 h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                {user ? (
                    <>
                        {showEditForm ? (
                            <form className="p-6" onSubmit={handleSubmit}>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Editar Usuario</h2>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                                    <select
                                        id="role"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="admin">Administrador</option>
                                        <option value="user">Usuario</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        onClick={hideForm}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Detalles del Usuario</h2>
                                <p className="text-gray-900"><strong>Nombre:</strong> {user.name}</p>
                                <p className="text-gray-900"><strong>Correo:</strong> {user.email}</p>
                                <p className="text-gray-900"><strong>Teléfono:</strong> {user.phone}</p>
                                <p className="text-gray-900"><strong>Rol:</strong> {user.role}</p>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={showForm}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        onClick={() => router.push("/users")}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-800">No se encontró el usuario.</p>
                )}
            </div>
        </div>
    );
}
