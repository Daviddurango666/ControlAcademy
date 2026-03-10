import React from "react";

function FiltroGrupoMateria({ grupos, materias, grupoSeleccionado, materiaSeleccionada, onGrupoChange, onMateriaChange }) {
  return (
    <div className="filter">
      <h3>Filtros</h3>
      <span>Selecciona el grupo y la materia</span>
      <div className="select">
        <div className="selectGroup">
          <p>Grupo</p>
          <select value={grupoSeleccionado} onChange={onGrupoChange}>
            <option value="">-- Selecciona --</option>
            {grupos.map((grupo, i) => (
              <option key={i} value={grupo}>{grupo}</option>
            ))}
          </select>
        </div>
        <div className="selectMateria">
          <p>Materia</p>
          <select value={materiaSeleccionada} onChange={onMateriaChange}>
            <option value="">-- Selecciona --</option>
            {materias.map((materia, i) => (
              <option key={i} value={materia}>{materia}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltroGrupoMateria;