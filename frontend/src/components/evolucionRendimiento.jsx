import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EvolucionRendimiento = ({ usuario }) => {
  const [dataEvolucion, setDataEvolucion] = useState([]);

  useEffect(() => {
    if (!usuario?.id) return;
    const fetchEvolucion = async () => {
      try {
        const res = await api.get(`/notas/evolucion/${usuario.id}`);
        setDataEvolucion(res.data);
      } catch (error) {
        console.error("Error al obtener evolución del rendimiento:", error);
      }
    };
    fetchEvolucion();
  }, [usuario]);

  const data = {
    labels: dataEvolucion.map((item) => `Periodo ${item.periodo}`),
    datasets: [
      {
        label: "Promedio de Notas",
        data: dataEvolucion.map((item) => item.promedioNotas),
        borderColor: "#1db954",
        backgroundColor: "rgba(29,185,84,0.3)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#1db954",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Evolución del Rendimiento Académico" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: { display: true, text: "Promedio de Notas" },
      },
    },
  };

  return (
    <div className="asistenciaChart">
      <Line data={data} options={options} />
    </div>
  );
};

export default EvolucionRendimiento;
