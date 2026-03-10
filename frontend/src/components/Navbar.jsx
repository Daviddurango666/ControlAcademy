// src/components/Navbar.jsx
function Navbar({ nombre }) {
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>Contatech</h2>
      <div>
        <span>{nombre}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
