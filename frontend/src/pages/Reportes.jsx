import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBook, faBookOpen, faCalendarAlt, faChartColumn, faChartSimple, faStar, faUser, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ComparativoPeriodos from "../components/ComparativoPeriodos";
import TablaRanking from "../components/TablaRanking";
import EvolucionRendimiento from "../components/evolucionRendimiento";
import DistribucionCalificaciones from "../components/DistribucionCalificaciones";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Reportes() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [promedio, setPromedio] = useState(0);
  const [mejoras, setMejoras] = useState(0);
  const [destacadas, setDestacadas] = useState(0);
  const [ranking, setRanking] = useState(0);


  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/"); // si no hay sesión, vuelve al login
    }
  }, [navigate]);

  const promedioCalificaciones = async() => {
    try {
      const res = await api.get(`/notas/promedio/${usuario.id}`);
      const data = res.data;
      setPromedio(data.promedio);
    }catch(error) {
      console.log("error al obtener el promedio: ", error.message);
    }
  }

  const getRanking = async () => {
    try {
      const res = await api.get(`/estudiantes/ranking/${usuario.id}`);
      setRanking(res.data.ranking);
    }catch(error) {
      console.log("error al obtener el ranking: ", error.message);
    }
  }

  const getMejoras = async() => {
    try {
      const res = await api.get(`/estudiantes/mejoras/${usuario.id}`);
      const data = res.data;
      setMejoras(data);
    } catch(error) {
      console.log("error al obtener las mejoras: ", error.message);
    }
  }

  const getMateriasDestacadas = async () => {
    try {
      const res = await api.get(`/materias/destacadas/${usuario.id}`);
      console.log(res);
      const data = res.data;
      setDestacadas(data.cantidad);
    }catch(error) {
      console.log("Error al obtener las materias destacadas: ", error.message);
    }
  }

  useEffect(()=> {
    promedioCalificaciones();
    getMejoras();
    getMateriasDestacadas();
    getRanking();
  })

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!usuario) return null;

  return (
    <>
    <div className='body'>
      <header>
        <h1 className="logo">ControlAcademy</h1>
        <div className="opciones">
          <span className="rol">
            {usuario.rol.toUpperCase()}
          </span>
          <button className="logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Menú dinámico según rol */}
      <div className="menu">
        {usuario.rol === "estudiante" ? (
          <nav>
            <ul>
              <li className="inactive" onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faChartColumn} className="Icon"/>Dashboard
              </li>
              <li className="inactive" onClick={() => navigate("/Calificaciones")}>
                <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Calificaciones
              </li>
              <li className="inactive" onClick={() => navigate("/Asistencias")}>
                <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Asistencias
              </li>
              <li className="active" onClick={() => navigate("/Reportes")}>
                <FontAwesomeIcon icon={faUsers} className="Icon" /> Reportes
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li className="active">
                <FontAwesomeIcon icon={faChartColumn} className="Icon" /> Dashboard
              </li>
              <li>
                <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de Notas
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Gestión de Asistencias
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de Reportes
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Principal */}
      <main className="main">
        <div className="title-reportes">
          <div className="titulos">
            <h2 className="welcome">Reportes de Rendimiento</h2>
            <h4 className="info">Análisis completo del desempeño académico</h4>
          </div>
          <div className="btn-reporte">
            <button className="descargarReporte" type="submit" onClick={() => window.print()}>Generar Reporte PDF</button> 
          </div>
        </div>

        {/* Cards resumen */}
        <div className="cards">
              <div className="card">
                <div className="title-card">
                  <h5>Ranking de Clase</h5>
                  <FontAwesomeIcon icon={faStar} className="Icon" />
                </div>
                <p className="num">#{ranking}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Materias Destacadas</h5>
                  <FontAwesomeIcon icon={faAward} className="Icon"/>
                </div>
                <p className="num">{destacadas}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Materias para Mejorar</h5>
                  <FontAwesomeIcon icon={faWarning} className="Icon"/>
                </div>
                <p className="num">{mejoras}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Proyeccion Final</h5>
                  <FontAwesomeIcon icon={faChartSimple} className="Icon" />
                </div>
                <p className="num">{promedio}</p>
              </div>
        </div>

        {/* Charts */}
        <div className="charts">
          <EvolucionRendimiento usuario={usuario}/>
          <DistribucionCalificaciones usuario={usuario}/>
        </div>
        <ComparativoPeriodos usuario={usuario}/>
      </main>
    </div>
    </>
  );
}

export default Reportes;
