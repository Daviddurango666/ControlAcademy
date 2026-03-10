import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../services/api.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AsistenciasPorMes({ usuario }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/asistencias/porMes/${usuario.id}`);
                const { labels, presente, ausente, tardanza } = res.data;

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Ausente",
                            data: ausente,
                            backgroundColor: "#FF0000"
                        },
                        {
                            label: "Presente",
                            data: presente,
                            backgroundColor: "#0ba900ff"
                        },
                        {
                            label: "Tardanza",
                            data: tardanza,
                            backgroundColor: "#ffaa00ff"
                        }
                    ]
                });
            } catch (error) {
                console.error("Error al cargar asistencias:", error);
            }
        };

        if (usuario) fetchData();
    }, [usuario]);

    if (!chartData) return <p>Cargando asistencia...</p>;

    return (
        <div className="card">
            <h3>Asistencia por Mes</h3>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "bottom" },
                        title: { display: true }
                    },
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, beginAtZero: true }
                    }
                }}
            />
        </div>
    );
}

export default AsistenciasPorMes;
