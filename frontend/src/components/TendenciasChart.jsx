import React, { useEffect, useRef, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import api from "../services/api.js"; 
import '../styles/dashboard.css';

// Registrar componentes de Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TendenciasChart({ usuario }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const cargarTendencia = async () => {
      try {
        const res = await api.get(`/notas/tendencia/${usuario.id}`);
        const data = res.data;

        if (!data || !data.materias || data.materias.length === 0) {
          console.warn("No hay datos de notas.");
          return;
        }

        const labels = data.periodos.map((p) => `P${p}`);

        // Cada materia será una línea
        const datasets = data.materias.map((materia, index) => ({
          label: materia.nombre,
          data: materia.promedios,
          borderColor: generarColor(index),
          backgroundColor: generarColor(index),
          tension: 0.3,
          fill: false,
        }));

        if (chartInstance) chartInstance.destroy();

        const newChart = new Chart(chartRef.current, {
          type: "line",
          data: {
            labels,
            datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: "bottom" },
              title: {
                display: true,
                text: "Tendencia de Calificaciones",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
                title: { display: true, text: "Calificación" },
              },
              x: {
                title: { display: true, text: "Periodo" },
              },
            },
          },
        });

        setChartInstance(newChart);
      } catch (error) {
        console.error("Error cargando tendencia de notas:", error);
      }
    };

    if (usuario?.id) cargarTendencia();

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [usuario]);

  // Genera colores únicos por materia
  const generarColor = (i) => {
    const colores = ["#1db954", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#10b981"];
    return colores[i % colores.length];
  };

  return (
    <div className="TendenciaNotasChart">
      <canvas ref={chartRef} id="tendenciaNotasChart"></canvas>
    </div>
  );
}

export default TendenciasChart;
