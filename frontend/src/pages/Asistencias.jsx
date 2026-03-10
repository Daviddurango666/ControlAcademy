import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBookOpen, faCalendarAlt, faChartColumn, faUsers, faCircleXmark, faClock } from '@fortawesome/free-solid-svg-icons';
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
import AsistenciasPorMes from "../components/asistenciasPorMes";
import ResumenAsistenciasPie from "../components/ResumenAsistenciasPie";
import TablaAsistencias from "../components/TablaAsistencias";

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

function Asistencias() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [presencia, setPresencia] = useState(0);
  const [ausencia, setAusencia] = useState(0);
  const [tardanzas, setTardanza] = useState(0);


  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/"); // si no hay sesión, vuelve al login
    }
  }, [navigate]);

  const presente = async () => {
    try {
      const res = await api.get(`/asistencias/presencia/${usuario.id}`);
      const data = res.data;
      setPresencia(data.Presencias);
    }catch(error){
      console.log("error al obtener los datos de asistencia: ", error);
    }
  }
  const ausente = async () => {
    try {
      const res = await api.get(`/asistencias/ausencia/${usuario.id}`);
      const data = res.data;
      setAusencia(data.Ausencias);
    }catch(error){
      console.log("error al obtener los datos de asistencia: ", error);
    }
  }
  const tardanza = async () => {
    try {
      const res = await api.get(`/asistencias/tardanzas/${usuario.id}`);
      const data = res.data;
      setTardanza(data.Tardanzas);
    }catch(error){
      console.log("error al obtener los datos de asistencia: ", error);
    }
  }
  useEffect(()=> {
    presente();
    ausente();
    tardanza();
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
          <nav>
            <ul>
              <li className="inactive" onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faChartColumn} className="Icon"/>Dashboard
              </li>
              <li className="inactive" onClick={() => navigate("/calificaciones")}>
                <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Calificaciones
              </li>
              <li className="active" onClick={() => navigate("/asistencias")}>
                <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Asistencias
              </li>
              <li className="inactive" onClick={() => navigate("/reportes")}>
                <FontAwesomeIcon icon={faUsers} className="Icon" /> Reportes
              </li>
            </ul>
          </nav>
      </div>

      {/* Principal */}
      <main className="main">
        <div className="title">
          <h2 className="welcome">Control de Asistencia</h2>
          <h4 className="info">
            Registro de asistencia de {usuario.nombre}
          </h4>
        </div>

        {/* Cards resumen */}
        <div className="cards">
            <>
              <div className="card">
                <div className="title-card">
                  <h5>Presencia</h5>
                  <FontAwesomeIcon icon={faCircleCheck} className="Icon" style={{color: '#30c72bff'}} />
                </div>
                <p className="num">{presencia}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Ausencia</h5>
                  <FontAwesomeIcon icon={faCircleXmark} className="Icon" style={{color: '#ff0000'}}/>
                </div>
                <p className="num">{ausencia}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Tardanza</h5>
                  <FontAwesomeIcon icon={faClock} className="Icon" style={{color: '#fb8b0bff'}}/>
                </div>
                <p className="num">{tardanzas}</p>
              </div>
            </>
        </div>

        {/* Charts */}
        <div className="charts">
            <>
              <div className="chartpormes">
                <AsistenciasPorMes usuario={usuario}/>
              </div>

              <div className="chartResumenPie">
                <ResumenAsistenciasPie usuario={usuario}/>
              </div>
            </>
        </div>

        <TablaAsistencias usuario={usuario}/>

      </main>
    </div>
    </>
  );
}

export default Asistencias;   
