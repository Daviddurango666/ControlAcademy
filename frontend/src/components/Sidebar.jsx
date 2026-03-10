// src/components/Sidebar.jsx
function Sidebar({ rol }) {
  return (
    <aside className="sidebar">
      <ul>
        <li>Inicio</li>
        <li>Perfil</li>
        {rol === "admin" && (
          <>
            <li>Usuarios</li>
            <li>Reportes</li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
