import { useState, useEffect, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import CinemaLogo from "../../assets/cinema-icon.png";
import { getPopularMovies } from "../../api/movies";
import { GlobalContext } from "../../App";
import "../Home/Header.css";
import { checkExpire, isAdmin, isTokenExpired } from "../../helpers";

function UserHeader() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);
  const theme = useContext(GlobalContext);
  checkExpire();
  isTokenExpired();

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
      <Navbar expand="lg" className={`navbar ${theme.theme}`} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src={CinemaLogo}
              alt="Cinema Logo"
              className="cinema-logo"
              style={{ maxHeight: "50px" }}
            />
            Cinema +
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                style={{ color: theme.theme === "dark" ? "white" : "black" }}
                as={Link}
                to="/"
                onClick={() => navigate("/")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={showModal}
                style={{ color: theme.theme === "dark" ? "white" : "black" }}
              >
                My Favorites
              </Nav.Link>

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        title="Favorite Movies"
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

export default UserHeader;
