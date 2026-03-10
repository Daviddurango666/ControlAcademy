import React, { use, useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBook, faBookOpen, faCalendarAlt, faChartColumn, faChartSimple, faGraduationCap, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import TendenciasChart from "../components/TendenciasChart";
import CalificacionesActuales from "../components/CalificacionesActuales";
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
import MateriaDetalle from "../components/MateriaDetalle";
import TablaEvaluaciones from "../components/TablaEvaluaciones";

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

function Calificaciones() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [porcentajeNotas, setPorcentajeNotas] = useState(0);
  const [EvaluacionesAprobadas, setEvaluacionesAprobadas] = useState(0);
  const [totalEvaluaciones, setTotalevaluaciones] = useState(0);
  const [Canmaterias, setCantmaterias] = useState(0);
  const [asistencias, setAsistencia] = useState(0);



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

  const cantMaterias = async () => {
    try {
      const res = await api.get(`/materias/cantidad/${usuario.id}`);
      const data = res.data;
      setCantmaterias(data.cantidad);
    } catch(error) {
      console.log("error al obtener la cantidad de materias: ", error.message);
    }
  }

  const totaldeevaluaciones = async () => {
    try {
      const res = await api.get(`/notas/totalExamenes/${usuario.id}`);
      const data = res.data;
      setTotalevaluaciones(data.total.total_examenes);
    }catch(error) { 
      console.log("Error al obtener el total de evaluaciones: ", error.message);
    }
  }

  const getAsistencia = async() => {
    try {
      const res = await api.get(`/asistencias/porcentaje/${usuario.id}`);
      const data = res.data;
      setAsistencia(parseFloat(data.porcentaje).toFixed(0));
    } catch(error) {
      console.log("error al obtener la asistencia: ", error.message);
    }
  }

  const getPorcentajeNotas = async() => {
    try {
      const res = await api.get(`/notas/porcentaje/${usuario.id}`);
      const data = res.data;
      setPorcentajeNotas(parseFloat(data.porcentaje).toFixed(0));
    } catch(error) {
      console.log("error al obtener el porcentaje de notas: ", error.message);
    }
  }

  const getEvaluacionesAprobadas = async () => {
    try {
      const res = await api.get(`/notas/aprobadas/${usuario.id}`);
      const data = res.data;
      setEvaluacionesAprobadas(data.total.evaluaciones_aprobadas);
    }catch(error) {
      console.log("Error al obtener las evaluaciones aprobadas: ", error.message);
    }
  }

  useEffect(()=> {
    promedioCalificaciones();
    getPorcentajeNotas();
    getEvaluacionesAprobadas();
    getAsistencia();  
    cantMaterias();
    totaldeevaluaciones();
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
            <li className="active" onClick={() => navigate("/calificaciones")}>
              <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Calificaciones
            </li>
            <li className="inactive" onClick={() => navigate("/asistencias")}>
              <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Asistencias
            </li>
            <li className="inactive" onClick={() => navigate("/reportes")}>
              <FontAwesomeIcon icon={faUsers} className="Icon" /> Reportes
            </li>
          </ul>
        </nav>
      </div>
    

      <div className="main">
        {/* <!-- bienvenida --> */}
        <div className="title">
            <h2>Calificaciones</h2>
            <h4 className="info" id="infoCalificaciones">Historial académico</h4>  
        </div>
        
        {/* <!-- charts de estudiantes --> */}
        <div className="charts" id="chartEstudiantes">
            <div className="tendenciaCalificaciones">
                {/* <!-- chart lineal de tendencia --> */}
                 <h3>Tendencia de Calificaciones</h3>
                 <h4 style={{color: '#ccc', fontSize: 13, fontWeight: 400}}>Evolución del rendimiento por período</h4>
                <TendenciasChart usuario={usuario}/>
            </div>
            
            {/* <!-- chart bar de asistencias --> */}
            <div className="califActuales">
                <CalificacionesActuales usuario={usuario}/>
            </div>
        </div>

        <div className="rendimientoAcademico">
            <h2><i className="fa-classic fa-graduation-cap"></i><FontAwesomeIcon icon={faGraduationCap}/> Rendimiento Academico</h2>
            <h5>{usuario.nombre}</h5>
            <h1 id="rendimientoPorc">{porcentajeNotas}%</h1>
            <span>Porcentaje general para todos los docentes</span>
            <progress value={porcentajeNotas} max="100" min="0"></progress>
            <div className="totales">
              <span>{asistencias}% Asistencias</span>
              <span>{Canmaterias} Materias</span>
              <span>{totalEvaluaciones} Evaluaciones</span>
            </div>
        </div>

        <div className="calificacionesXmateria">
            <MateriaDetalle usuario={usuario}/>
        </div>

        {/* <!-- cards de calificaciones estudiantes--> */}
        <div className="cards" id="cardsEstudiantes" >
            {/* <!-- promedio --> */}
            <div className="card">
                <div className="title-card">
                    <h5>Total Evaluaciones</h5>
                    <i className="fa fa-award"></i>
                </div>
                <p className="num" id="promedio">{totalEvaluaciones}</p>
                <p className="more-info">Trabajos realizados</p>
            </div>
            {/* <!-- asistencias --> */}
            <div className="card">
                <div className="title-card">
                    <h5>Evaluaciones Aprobadas</h5>
                    <i className="fa fa-user"></i>
                </div>
                <p className="num" id="asistencia">{EvaluacionesAprobadas}</p>
                <p className="more-info">De todas las evaluaciones realizadas</p>
            </div>
            {/* <!-- materias --> */}
            <div className="card">
                <div className="title-card">
                    <h5>Materias Cursando</h5>
                    <i className="fa fa-book"></i>
                </div>
                <p className="num" id="materias">{Canmaterias}</p>
                <p className="more-info">Asignaturas activas</p>
            </div>  
            {/* <!-- tendencia --> */}
            <div className="card">
                <div className="title-card">
                    <h5>Rendimiento Global</h5>
                    <i className="fa fa-chart-simple"></i>
                </div>
                <p className="num" id="tendencia">🔝</p>
                <p className="more-info">Nivel académico</p>
            </div>
        </div>

        <TablaEvaluaciones usuario={usuario}/>
        
      </div>
    </div>
    </>
  );
}

export default Calificaciones;
