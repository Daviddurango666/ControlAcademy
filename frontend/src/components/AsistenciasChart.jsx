import React, { useEffect, useRef, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import api from "../services/api.js"; 
import '../styles/dashboard.css';

// Registrar componentes de Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AsistenciasChart({ usuario }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const cargarAsistencias = async () => {
      try {
        const res = await api.get(`/asistencias/resumen/${usuario.id}`);
        const data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No hay datos de asistencia.");
          return;
        }

        const labels = data.map(item => `Periodo ` + item.periodo);
        const presentes = data.map(item => item.presente);
        const ausentes = data.map(item => item.ausente);
        const tardes = data.map(item => item.tarde);

        if (chartInstance) chartInstance.destroy();

        const newChart = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: `Presente`,
                data: presentes,
                backgroundColor: "#0ba900ff",
                borderWidth: 1,
              },
              {
                label: "Ausente",
                data: ausentes,
                backgroundColor: "#ff0000",
                borderWidth: 1,
              },
              {
                label: "Tarde",
                data: tardes,
                backgroundColor: "#ffaa00ff",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true },
            },
            scales: {
              y: { beginAtZero: true },
            },
          },
        });

        setChartInstance(newChart);
      } catch (error) {
        console.error("Error cargando las asistencias:", error);
      }
    };

    if (usuario?.id) cargarAsistencias();

    // Limpieza al desmontar
    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [usuario]);

  return (
    <div className="asistenciaChart">
      <canvas ref={chartRef} id="asistenciaChart"></canvas>
    </div>
  );
}

export default AsistenciasChart;
