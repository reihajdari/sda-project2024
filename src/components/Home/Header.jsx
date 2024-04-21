import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Form, Nav, Button } from "react-bootstrap";
import { Modal } from "antd";
import CinemaLogo from "../../assets/cinema-icon.png";
import HeaderInfo from "./HeaderInfo";
import { getPopularMovies } from "../../api/users";
import { SearchContext } from "../../screens/Home";
import { ThemeContext } from "../../App";
import "./Header.css";

function Header() {
  const search = useContext(SearchContext);
  const theme = useContext(ThemeContext);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);

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
        console.error("Error fetching popular movies:", error);
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

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    search.setSearchTerm(searchTerm);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    setFilteredMovies(filtered);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
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
          <Form className={`d-flex ${theme.theme}`}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search.searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
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
            <Button
              onClick={handleThemeToggle}
              className={`theme-toggle-button ${theme.theme}`}
            >
              {theme.theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <HeaderInfo movies={filteredMovies} />

      <Modal
        title="Favorite Movies"
        open={isModalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        className={`modal ${theme.theme}`}
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

export default Header;
