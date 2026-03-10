import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import api from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DistribucionCalificaciones = ({ usuario }) => {
  const [dataDistribucion, setDataDistribucion] = useState(null);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");

  const fetchDistribucion = async (periodo = "") => {
    try {
      const res = await api.get(`/notas/distribucion/${usuario.id}`, {
        params: { periodo: periodo || null },
      });

      // Si el backend devuelve varios periodos, tomamos solo el seleccionado
      const datos = res.data.length > 0 ? res.data[0] : null;
      setDataDistribucion(datos);
    } catch (error) {
      console.error("Error al obtener la distribución:", error);
    }
  };

  useEffect(() => {
    if (usuario?.id) fetchDistribucion(periodoSeleccionado);
  }, [usuario, periodoSeleccionado]);

  const chartData = {
    labels: ["Aprobadas", "En Riesgo", "Reprobadas"],
    datasets: [
      {
        label: "Cantidad",
        data: dataDistribucion
          ? [
              dataDistribucion.CantAprobadas,
              dataDistribucion.CantRiesgo,
              dataDistribucion.CantReprobadas,
            ]
          : [0, 0, 0],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"], // verde, amarillo, rojo
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#000",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: periodoSeleccionado
          ? `Distribución de Calificaciones - Periodo ${periodoSeleccionado}`
          : "Distribución de Calificaciones (Todos los periodos)",
        color: "#000",
      },
    },
  };

  return (
    <div className="asistenciaChart">
      <div>
        {/* <h2>Distribució n de Calificaciones</h2> */}
        <select
          className="selectPeriodo"
          value={periodoSeleccionado}
          onChange={(e) => setPeriodoSeleccionado(e.target.value)}
        >
          <option value="">Todos los periodos</option>
          <option value="1">Periodo 1</option>
          <option value="2">Periodo 2</option>
          <option value="3">Periodo 3</option>
          <option value="4">Periodo 4</option>
        </select>
      </div>

          <Doughnut data={chartData} options={chartOptions} />
      {/* <div>
        {dataDistribucion ? (
          <div>
          </div>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div> */}
    </div>
  );
};

export default DistribucionCalificaciones;
