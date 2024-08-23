"use client";
import { useRouter } from 'next/router';
import { gql, useQuery } from "@apollo/client";
import createApolloClient from "@/lib/apollo-client";
import { useState, useEffect } from "react";
import FinancialChart from "@/components/chart";
import * as crypto from 'crypto';
import AppNavigation from '@/partial/navigation';

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

interface ChartData {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
}

const roleCrypto = (role: string) => {
  const _role = btoa(role).concat('??').concat('nestjs_app');
  const hash = crypto.createHash('sha256');
  hash.update(_role);
  return hash.digest('hex');
}
export default function ReportsPage() {
  //const router = useRouter();

  const checkAuthorization = () => {
    // Implementa la lógica para verificar si el usuario está autorizado
    const role = localStorage.getItem('role');
    return role === roleCrypto('admin'); // Ejemplo de verificación
  };
  useEffect(() => {
    const isAuthorized = checkAuthorization();

    if (!isAuthorized) {
      window.location.href = '/'; // Redirige al usuario
      //alert('Usuario no autorizado')
      //router.push('/')
    }
  }, []);

  const [client] = useState(() => createApolloClient());
  const { data, loading, error } = useQuery(MOVEMENT_QUERY, { client });

  const [categorizedData, setCategorizedData] = useState<[any[], any[]]>([[], []]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [percentageIncomes, setPercentageIncomes] = useState(0);
  const [percentageExpenses, setPercentageExpenses] = useState(0);
  const [chartData, setChartData] = useState<ChartData>({ labels: [], incomeData: [], expenseData: [] });

  useEffect(() => {
    if (data) {
      const movements = data.findAllMovements || [];
      const incomes = movements.filter((movement: any) => movement.type === 'Ingreso');
      const expenses = movements.filter((movement: any) => movement.type === 'Egreso');
      setCategorizedData([incomes, expenses]);

      const sumAmount = (items: any[]) => items.reduce((acc: number, item: any) => acc + parseFloat(item.amount), 0);

      const totalIncomesAmount = sumAmount(incomes);
      const totalExpensesAmount = sumAmount(expenses);

      setTotalIncomes(totalIncomesAmount);
      setTotalExpenses(totalExpensesAmount);
      const combinedTotal = totalIncomesAmount + totalExpensesAmount;

      setPercentageIncomes(combinedTotal > 0 ? (totalIncomesAmount / combinedTotal) * 100 : 0);
      setPercentageExpenses(combinedTotal > 0 ? (totalExpensesAmount / combinedTotal) * 100 : 0);

      const labels = Array.from(new Set([...incomes.map((item: any) => item.date), ...expenses.map((item: any) => item.date)]));
      const incomeData = labels.map(label => incomes.filter((item: any) => item.date === label).reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0));
      const expenseData = labels.map(label => expenses.filter((item: any) => item.date === label).reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0));

      setChartData({ labels, incomeData, expenseData });
    }
  }, [data]);

  const getCurrentBalance = () => {
    return totalIncomes - totalExpenses;
  };

  const exportToCSV = () => {
    const csvRows: string[] = [];

    csvRows.push('Concept,Amount,Date,Type');

    const movements = data?.findAllMovements || [];
    movements.forEach((movement: any) => {
      csvRows.push([movement.concept, movement.amount, movement.date, movement.type].join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movements_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-center text-blue-500 font-bold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-bold">Error: {error.message}</p>;

  const [incomes, expenses] = categorizedData;

  return (
    <>
      <main className="p-6 bg-gray-100 min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Reporte de Movimientos</h1>
          <div className="mb-4">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Monto</th>
                  <th className="px-4 py-2">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-100 text-green-800">
                  <td className="px-4 py-2 font-semibold">Ingresos</td>
                  <td className="px-4 py-2">${totalIncomes.toFixed(2)}</td>
                  <td className="px-4 py-2">{percentageIncomes.toFixed(2)}%</td>
                </tr>
                <tr className="bg-red-100 text-red-800">
                  <td className="px-4 py-2 font-semibold">Egresos</td>
                  <td className="px-4 py-2">${totalExpenses.toFixed(2)}</td>
                  <td className="px-4 py-2">{percentageExpenses.toFixed(2)}%</td>
                </tr>
                <tr className="bg-blue-100 text-blue-800">
                  <td className="px-4 py-2 font-semibold">Saldo Actual</td>
                  <td className="px-4 py-2">${getCurrentBalance().toFixed(2)}</td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <FinancialChart data={chartData} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={exportToCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Descargar Reporte CSV
            </button>
          </div>
        </div>
      </main>
    </>
  );
}