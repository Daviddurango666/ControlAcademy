// importar libreria express
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importar rutas
import estudiantesRoutes from './routes/estudiantes.router.js';
import notasRoutes from './routes/notas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import docentesRoutes from './routes/docentes.routes.js';
import cursosRoutes from './routes/cursos.routes.js';
import asistenciasRoutes from './routes/asistencias.routes.js';
import materiasRoutes from './routes/materias.routes.js';
import reportesRoutes from './routes/reportes.router.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/usuario", usuariosRoutes);
app.use("/notas", notasRoutes);
app.use("/estudiantes", estudiantesRoutes);
app.use("/docentes", docentesRoutes);
app.use("/cursos", cursosRoutes);
app.use("/materias", materiasRoutes);
app.use("/asistencias", asistenciasRoutes);
app.use("/reportes", reportesRoutes);

app.listen(PORT, () => {
    console.log(`STARTING API IN http://localhost:${PORT}`);
});