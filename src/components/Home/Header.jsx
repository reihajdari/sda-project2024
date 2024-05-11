import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Form, Nav } from "react-bootstrap";
import { Modal } from "antd";
import CinemaLogo from "../../assets/cinema-icon.png";
import HeaderInfo from "./HeaderInfo";
import { getPopularMovies } from "../../api/movies";
import { SearchContext } from "../../screens/Home";
import { GlobalContext } from "../../App";
import "./Header.css";
import { checkExpire, isAdmin, isTokenExpired } from "../../helpers";

function Header() {
  const search = useContext(SearchContext);
  const theme = useContext(GlobalContext);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);

  checkExpire();
  isTokenExpired();
  isAdmin();

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
    if (isModalOpen) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoriteMovieIds(storedFavorites);
    }
  }, [isModalOpen]);

  const filteredFavorites = movies.filter((movie) =>
    favoriteMovieIds.includes(movie.id)
  );

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
      <Navbar
        expand="lg"
        className={`navbar-fixed-topnavbar ${theme.theme}`}
        collapseOnSelect
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src={CinemaLogo}
              alt="Icon Image"
              style={{ maxHeight: "50px" }}
              className="cinema-logo"
            />
            Cinema +
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Form
              className={`d-flex ${theme.theme} w-100`}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search.searchTerm}
                onChange={handleSearchChange}
                className="me-2"
              />
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                style={{ color: theme.theme === "dark" ? "white" : "black" }}
                as={Link}
                to="/"
                onClick={() => navigate("/")}
              >
                Home
              </Nav.Link>
              {!isAdmin() && (
                <Nav.Link
                  onClick={showModal}
                  style={{ color: theme.theme === "dark" ? "white" : "black" }}
                >
                  My Favorites
                </Nav.Link>
              )}

              <Nav.Link
                onClick={handleThemeToggle}
                style={{ color: theme.theme === "dark" ? "white" : "black" }}
              >
                {theme.theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Nav.Link>
              {isTokenExpired() ? (
                <>
                  <Nav.Link
                    as={Link}
                    style={{
                      color: theme.theme === "dark" ? "white" : "black",
                    }}
                    to="/user"
                    onClick={() => navigate("/")}
                  >
                    Login/Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  {!isAdmin() && (
                    <Nav.Link
                      as={Link}
                      to="/reservations"
                      onClick={() => navigate("/")}
                      style={{
                        color: theme.theme === "dark" ? "white" : "black",
                      }}
                    >
                      Reservations
                    </Nav.Link>
                  )}
                  {isAdmin() ? (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/admindashboard"
                        onClick={() => navigate("/")}
                        style={{
                          color: theme.theme === "dark" ? "white" : "black",
                        }}
                      >
                        Admin Dashboard
                      </Nav.Link>
                    </>
                  ) : (
                    <></>
                  )}
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                      localStorage.clear("idToken");
                    }}
                    style={{
                      color: theme.theme === "dark" ? "white" : "black",
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <HeaderInfo movies={filteredMovies} />

      <Modal
        title="Favorite Movies"
        open={isModalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <ul>
          {filteredFavorites.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/posts/${movie.id}`}
                style={{ color: theme.theme === "dark" ? "white" : "black" }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default Header;
