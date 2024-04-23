import { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CinemaLogo from "../../assets/cinema-icon.png";
import { Modal } from "antd";
import { getPopularMovies } from "../../api/users";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import "../Home/Header.css";

function HeaderSinglePost() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme.theme));
  }, [theme.theme]);

  const handleThemeToggle = () => {
    const newTheme = theme.theme === "dark" ? "light" : "dark";
    theme.setTheme(newTheme);
  };

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
        setFilteredMovies(data.results);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      });

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovieIds(storedFavorites);
  }, []);

  useEffect(() => {
    const favorites = movies.filter((movie) =>
      favoriteMovieIds.includes(movie.id)
    );
    setFilteredMovies(favorites);
  }, [movies, favoriteMovieIds]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovieIds(storedFavorites);
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`header-wrapper ${theme.theme}`}>
      <Navbar expand="lg" className={`navbar ${theme.theme}`}>
        <Container fluid>
          <Navbar.Brand
            className={`theme-toggle-button ${theme.theme}`}
            onClick={() => navigate("/")}
          >
            <img
              src={CinemaLogo}
              alt="Icon Image"
              style={{ maxHeight: "50px" }}
              className="cinema-logo"
            />
            Cinema +
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link
              className={`theme-toggle-button ${theme.theme}`}
              as={Link}
              to="/"
              onClick={() => navigate("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={showModal}
              className={`theme-toggle-button ${theme.theme}`}
            >
              My Favorites
            </Nav.Link>
            <Nav.Link
              onClick={handleThemeToggle}
              className={`theme-toggle-button ${theme.theme}`}
            >
              {theme.theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Nav.Link>
            <Nav.Link
              className={`theme-toggle-button ${theme.theme}`}
              as={Link}
              to="/user"
              onClick={() => navigate("/")}
            >
              Login/Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal
        title="Favorites Movies"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/posts/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default HeaderSinglePost;
