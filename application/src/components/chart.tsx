import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FinancialChartProps {
    data: {
        labels: string[];
        incomeData: number[];
        expenseData: number[];
    };
}

const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Ingresos',
                data: data.incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
            {
                label: 'Egresos',
                data: data.expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#333'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.raw}`
                }
            },
            title: {
                display: true,
                text: 'Ingresos y Egresos',
                font: {
                    size: 16
                },
                color: '#333'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha',
                    color: '#333',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: '#333'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Monto',
                    color: '#333',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: '#333',
                    beginAtZero: true
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default FinancialChart;