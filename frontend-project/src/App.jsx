import "./App.css";

const Header = () => {
  return (
    <div className="headerC">
      <header className="header">
        <h1 className="titulo">Mi Sitio</h1>
        <nav className="navbar">
          <a href="#inicio" className="link">
            Inicio
          </a>
          <a href="#sobre-mi" className="link">
            Sobre mí
          </a>
          <a href="#contacto" className="link">
            Contacto
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
