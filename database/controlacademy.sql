-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2026 a las 22:50:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controlacademy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `estado` enum('presente','ausente','tarde') NOT NULL DEFAULT 'presente',
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id`, `estudiante_id`, `materia_id`, `fecha`, `estado`, `observaciones`) VALUES
(1, 1, 1, '2025-09-01', 'presente', NULL),
(2, 2, 1, '2025-09-01', 'ausente', NULL),
(3, 3, 1, '2025-09-01', 'tarde', NULL),
(4, 1, 2, '2025-09-02', 'presente', NULL),
(5, 2, 2, '2025-09-02', 'presente', NULL),
(6, 3, 2, '2025-09-02', 'ausente', NULL),
(7, 4, 3, '2025-09-01', 'presente', NULL),
(8, 5, 3, '2025-09-01', 'tarde', NULL),
(9, 4, 4, '2025-09-02', 'ausente', NULL),
(10, 5, 4, '2025-09-02', 'presente', NULL),
(11, 6, 1, '2025-09-01', 'presente', NULL),
(12, 6, 2, '2025-09-02', 'ausente', NULL),
(13, 6, 3, '2025-09-03', 'presente', NULL),
(14, 6, 4, '2025-09-04', 'tarde', NULL),
(16, 6, 3, '2025-11-11', 'ausente', ''),
(17, 6, 4, '2025-11-11', 'presente', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `docente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `descripcion`, `docente_id`) VALUES
(1, 'Matemáticas Avanzadas', 'Curso de álgebra y trigonometría', 1),
(2, 'Historia Universal', 'Curso de historia antigua y moderna', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`id`, `usuario_id`, `especialidad`) VALUES
(1, 1000000002, 'Matemáticas'),
(2, 1000000003, 'Calculo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `IdAlumno` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `grado` varchar(20) NOT NULL,
  `grupo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`IdAlumno`, `usuario_id`, `grado`, `grupo`) VALUES
(1, 1000000004, '10', 'A'),
(2, 1000000005, '10', 'A'),
(3, 1000000006, '10', 'B'),
(4, 1000000007, '9', 'A'),
(5, 1000000008, '9', 'B'),
(6, 1038927151, '11', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `clase_virtual` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `nombre`, `curso_id`, `clase_virtual`) VALUES
(1, 'Álgebra', 1, 0),
(2, 'Trigonometría', 1, 0),
(3, 'Historia Antigua', 2, 0),
(4, 'Historia Moderna', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `nota` decimal(5,2) NOT NULL,
  `periodo` int(11) NOT NULL,
  `fecha_nota` date NOT NULL DEFAULT current_timestamp(),
  `evaluacion` varchar(100) DEFAULT NULL,
  `porcentaje` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `estudiante_id`, `materia_id`, `nota`, `periodo`, `fecha_nota`, `evaluacion`, `porcentaje`) VALUES
(1, 6, 1, 4.50, 1, '2025-10-20', 'Examen', 20),
(2, 2, 1, 2.80, 1, '2025-10-20', 'Examen', 30),
(3, 3, 1, 3.70, 1, '2025-10-20', 'Examen', 40),
(4, 1, 2, 4.20, 1, '2025-10-20', 'Examen', 20),
(5, 2, 2, 3.10, 1, '2025-10-20', 'Examen', 20),
(6, 3, 2, 2.50, 1, '2025-10-20', 'Examen', 10),
(7, 4, 3, 4.00, 1, '2025-10-20', 'Examen', 15),
(8, 5, 3, 2.90, 1, '2025-10-20', 'Examen', 12),
(9, 4, 4, 4.80, 1, '2025-10-20', 'Examen', 10),
(10, 5, 4, 3.40, 1, '2025-10-20', 'Examen', 10),
(11, 6, 1, 4.30, 1, '2025-10-20', 'Examen', 20),
(12, 6, 2, 3.70, 1, '2025-10-20', 'Examen', 20),
(13, 6, 3, 2.90, 1, '2025-10-20', 'Examen', 10),
(14, 6, 4, 4.60, 1, '2025-10-20', 'Examen', 20),
(17, 6, 3, 3.00, 1, '2025-11-12', 'taller', 10),
(18, 6, 1, 20.00, 1, '2025-11-12', 'Examen', 10),
(19, 6, 1, 1.00, 1, '2025-11-12', 'Examen', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL,
  `estudiante_id` int(11) DEFAULT NULL,
  `materia_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo` varchar(30) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id_reporte`, `estudiante_id`, `materia_id`, `fecha`, `tipo`, `descripcion`) VALUES
(1, 6, 3, '2025-11-12', 'Comportamiento', 'Indisciplina'),
(3, 6, 3, '2025-11-12', 'Académico', 'No hizo el taller');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','docente','estudiante','padre') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`) VALUES
(0, 'Daniel Giraldo', 'daniel.giraldo@controlacademy.com', '1000000009', 'estudiante'),
(1000000001, 'Carlos Pérez', 'carlos.perez@controlacademy.com', 'admin', 'admin'),
(1000000002, 'Laura Gómez', 'laura.gomez@controlacademy.com', '1000000002', 'docente'),
(1000000003, 'Pedro Ramírez', 'pedro.ramirez@controlacademy.com', '1000000003', 'docente'),
(1000000004, 'Andrés Torres', 'andres.torres@controlacademy.com', '1000000004', 'estudiante'),
(1000000005, 'María Rodríguez', 'maria.rodriguez@controlacademy.com', '1000000005', 'estudiante'),
(1000000006, 'Sofía López', 'sofia.lopez@controlacademy.com', '1000000006', 'estudiante'),
(1000000007, 'Daniela Sánchez', 'daniela.sanchez@controlacademy.com', '1000000007', 'estudiante'),
(1000000008, 'Julián Morales', 'julian.morales@controlacademy.com', '1000000008', 'estudiante'),
(1038927151, 'David Durango', 'daviddurango@controlacademy.com', '1038927151', 'estudiante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docente_id` (`docente_id`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`IdAlumno`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `IdAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`IdAlumno`),
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`docente_id`) REFERENCES `docentes` (`id`);

--
-- Filtros para la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD CONSTRAINT `docentes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`IdAlumno`),
  ADD CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`IdAlumno`),
  ADD CONSTRAINT `reportes_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
