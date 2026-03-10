import React, { use, useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBook, faBookOpen, faCalendarAlt, faChartColumn, faChartSimple, faComputer, faUser, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';
import RendimientoAcademico from "../components/rendimientoAcademico";
import AsistenciasChart from "../components/AsistenciasChart";
import TablaAsistenciaDocentes from "../components/TablaAsistenciaDocente";
import TablaReqAtencion from "../components/TablaReqAtencion";
import TablaEstudiantesDestacados from "../components/TablaEstudiantesDestacados";
import RankingMejoresEstudiantes from "../components/rankingMejoresEstudiantes";

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [promedio, setPromedio] = useState(0);
  const [asistencia, setAsistencia] = useState(0);
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [destacadas, setDestacadas] = useState(0);
  const [reqAtencion, setReqAtencion] = useState(0);
  const [estudiantesDestacados, setestudiantesDestacados] = useState(0);
  const [classVirtual, setClassVirtual] = useState(0);
  const [cantAsignaturas, setCantAsignaturas] = useState(0);


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

  const getAsistencia = async() => {
    try {
      const res = await api.get(`/asistencias/porcentaje/${usuario.id}`);
      const data = res.data;
      setAsistencia(data.porcentaje);
    } catch(error) {
      console.log("error al obtener la asistencia: ", error.message);
    }
  }

  const getCantidadAsignaturas = async () => {
    try {
      const res = await api.get(`/docentes/cantAsig/${usuario.id}`);
      const data = res.data;
      setCantAsignaturas(data.cantidad_asig);
    }catch(error) {
      console.log("Error al obtener las materias destacadas: ", error.message);
    }
  }

  const getTotalEstudiantes = async() => {
    try {
      const res = await api.get(`/docentes/cantEstudiantes/${usuario.id}`);
      const data = res.data;
      setTotalEstudiantes(data.totalEstudiantes);
    } catch(error) {
      console.log("error al obtener los estudiantes destacados: ", error.message);
    }
  }
  const getClasesVirtuales = async() => {
    try {
      const res = await api.get(`/docentes/virtualClass/${usuario.id}`);
      const data = res.data;
      setClassVirtual(data.totalVirtual);
    } catch(error) {
      console.log("error al obtener las clases virtuales: ", error.message);
    }
  }

  const getMateriasDestacadas = async() => {
    try {
      const res = await api.get(`/materias/destacadas/${usuario.id}`);
      const data = res.data;
      setDestacadas(data.cantidad);
    }catch(error) {
      console.log("error al obtener las materias destacadas");
    }
  }

  const getEstudiantesDestacados = async () =>  {
    try {
      const res = await api.get(`/docentes/estudiantesDestacados/${usuario.id}`);
      console.log(res);
      const data = res.data;
      setestudiantesDestacados(data.destacados);
    }catch(error) {
      console.log("error al obtener los estudiantes destacados");
    }
  }
  
  const getReqAtencion = async () => {
    try {
      const res =await api.get(`/docentes/estudiantesReqAtencion/${usuario.id}`);
      console.log(res);
      setReqAtencion(res.data.requieren_atencion);
    }catch(error) {
      console.log("error al obtener los estudiantes que requieren atencion");
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/");
  };
 
  useEffect(()=> {
    promedioCalificaciones();
    getAsistencia();
    getCantidadAsignaturas();
    getClasesVirtuales();
    getTotalEstudiantes();
    getMateriasDestacadas();
    getEstudiantesDestacados();
    getReqAtencion();
  })
  
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
              <li className="active" onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faChartColumn} className="Icon"/>Dashboard
              </li>
              <li className="inactive" onClick={() => navigate("/calificaciones")}>
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
        ) : (
          <nav>
            <ul>
              <li className="active" onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faChartColumn} className="Icon" /> Dashboard
              </li>
              <li className="inactive" onClick={() => navigate("/gestionNotas")}>
                <FontAwesomeIcon icon={faBookOpen} className="Icon" /> Gestión de Notas
              </li>
              <li className="inactive" onClick={() => navigate("/gestionAsistencias")}>
                <FontAwesomeIcon icon={faCalendarAlt} className="Icon" /> Gestión de Asistencias
              </li>
              <li className="inactive" onClick={() => navigate("/gestionReportes")}>
                <FontAwesomeIcon icon={faUsers} className="Icon" /> Gestión de Reportes
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Principal */}
      <main className="main">
        <div className="title">
          <h2 className="welcome">Bienvenido, {usuario.nombre}</h2>
          <h4 className="info">
            Panel de control académico ({usuario.rol})
          </h4>
        </div>

        {/* Cards resumen */}
        <div className="cards">
          {usuario.rol === "estudiante" ? (
            <>
              <div className="card">
                <div className="title-card">
                  <h5>Promedio General</h5>
                  <FontAwesomeIcon icon={faAward} className="Icon" />
                </div>
                <p className="num">{promedio}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Asistencia</h5>
                  <FontAwesomeIcon icon={faUser} className="Icon"/>
                </div>
                <p className="num">{asistencia}%</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Materias Destacadas</h5>
                  <FontAwesomeIcon icon={faBook} className="Icon"/>
                </div>
                <p className="num">{destacadas}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Tendencia</h5>
                  <FontAwesomeIcon icon={faChartSimple} className="Icon" />
                </div>
                <p className="num">🔝</p>
              </div>
            </>
          ) : (
            <>
              <div className="card">
                <div className="title-card">
                  <h5>Total Estudiantes</h5>
                  <FontAwesomeIcon icon={faUsers} className="Icon" />
                </div>
                <p className="num">{totalEstudiantes}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Cantidad Asignaturas</h5>
                  <FontAwesomeIcon icon={faBookOpen} className="Icon" />
                </div>
                <p className="num">{cantAsignaturas}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Estudiantes Destacados</h5>
                  <FontAwesomeIcon icon={faUser} className="Icon" />
                </div>
                <p className="num">{estudiantesDestacados}</p>
              </div>

              <div className="card">
                <div className="title-card">
                  <h5>Requieren Atencion</h5>
                  <FontAwesomeIcon icon={faWarning} className="Icon" />
                </div>
                <p className="num">{reqAtencion}</p>
              </div>
              
              <div className="card">
                <div className="title-card">
                  <h5>Clases Virtuales</h5>
                  <FontAwesomeIcon icon={faComputer} className="Icon" />
                </div>
                <p className="num">{classVirtual}</p>
              </div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="charts">
          {usuario.rol === "estudiante" ? (
            <>
              <div className="chart">
                <RendimientoAcademico usuario={usuario} />
              </div>

              <div className="chart">
                <AsistenciasChart usuario={usuario}/>
              </div>
            </>
          ) : (
            <div className="chart">
              <h4>Estudiantes Destacados</h4>
              <TablaEstudiantesDestacados usuario={usuario}/>
              {/* <h4>Ranking Mejores Estudiantes</h4>
              <RankingMejoresEstudiantes usuario={usuario}/> */}
              <h4>Estudiantes que requieren Atencion</h4>
              <TablaReqAtencion usuario={usuario}/>
              <br />
              <h4>Asistencias de Estudiantes</h4>
              <TablaAsistenciaDocentes usuario={usuario}/>
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  );
}

export default Dashboard;
