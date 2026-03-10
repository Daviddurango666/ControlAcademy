import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import api from "../services/api.js";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ResumenAsistenciasPie({ usuario }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/asistencias/resumenPorcentaje/${usuario.id}`);
                const { labels, data } = res.data;

                setChartData({
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: ["#0ba900ff", "#ff0000", "#ffaa00ff"],
                            hoverOffset: 10
                        }
                    ]
                });
            } catch (error) {
                console.error("Error cargando resumen:", error);
            }
        };

        if (usuario) fetchData();
    }, [usuario]);

    if (!chartData) return <p>Cargando resumen de asistencias...</p>;

    return (
        <div className="card w-[400px] p-4 shadow-lg rounded-2xl bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Resumen de Asistencias
            </h3>
            <Pie
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom"
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default ResumenAsistenciasPie;
