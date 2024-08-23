import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import createApolloClient from '@/lib/apollo-client';

// Definir la mutación GraphQL
const CREATE_MOVEMENT = gql`
  mutation CreateMovement($createMovementInput: CreateMovementInput!) {
    createNewMovement(createMovementInput: $createMovementInput) {
      amount
      concept
      userId
      id
      type
    }
  }
`;

// Definir los props del componente Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalMovement: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const userID = localStorage.getItem('id') || ''; // Valor por defecto en caso de null
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Egreso');
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    const [createMovement] = useMutation(CREATE_MOVEMENT, {
        client: createApolloClient(),
        onCompleted: () => {
            onClose();
        },
        onError: (error) => {
            console.error('Error during mutation:', error.message);
            setError('Error al guardar el movimiento.'); // Mostrar mensaje de error
        },
    });

    useEffect(() => {
        if (!isOpen) {
            setAmount('');
            setConcept('');
            setType('Egreso');
            setError(null); // Limpiar error cuando el modal se cierra
        }
    }, [isOpen]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createMovement({
                variables: {
                    createMovementInput: {
                        amount,
                        concept,
                        userId: userID,
                        type,
                    },
                },
            });
        } catch (e: any) {
            console.error('Error during mutation:', e);
            setError('Error al guardar el movimiento.'); // Mostrar mensaje de error
        }
    };

    useEffect(() => {
        if (error) {
            alert(error); // Mostrar alerta en caso de error
        }
    }, [error]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Agregar Movimiento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="concept" className="block text-sm font-medium text-gray-800">Concepto</label>
                        <input
                            type="text"
                            id="concept"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-800">Monto</label>
                        <input
                            type="text"
                            id="amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-800">Tipo</label>
                        <select
                            id="type"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="Egreso">Egreso</option>
                            <option value="Ingreso">Ingreso</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 text-white px-5 py-2 rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalMovement;
