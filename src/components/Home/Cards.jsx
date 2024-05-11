import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { StarTwoTone } from "@ant-design/icons";
import { getPopularMovies } from "../../api/movies";
import { SearchContext } from "../../screens/Home.jsx";
import { GlobalContext } from "../../App";
import { checkExpire, isTokenExpired, trimDescription } from "../../helpers.js";
import "./cards.css";

function Cards() {
  const [showMoreMap, setShowMoreMap] = useState({});
  const [favorites, setFavorites] = useState([]);
  const search = useContext(SearchContext);
  const { theme } = useContext(GlobalContext);

  const tokenExpired = isTokenExpired();
  checkExpire();

  const {
    data: popularMovies,
    error,
    isLoading,
  } = useQuery({ queryKey: ["popularMovies"], queryFn: getPopularMovies });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleShowMore = (id) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      }
      return [...prevFavorites, id];
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (isLoading) {
    return <div>Loading popular movies...</div>;
  }

  if (error) {
    return <div>Error fetching popular movies: {error.message}</div>;
  }

  const filteredMovies = popularMovies.results?.filter((movie) =>
    movie.title.toLowerCase().includes(search.searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <Row xs={1} md={3} className="g-4">
        {filteredMovies?.map((movie) => (
          <Col key={movie.id}>
            <Card
              style={{
                backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
                color: theme === "dark" ? "#fff" : "#000",
              }}
              className="card"
            >
              <Card.Img
                variant="top"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/150"
                }
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {showMoreMap[movie.id]
                    ? movie.overview
                    : trimDescription(movie.overview, 50)}
                </Card.Text>
                <Button variant="link" onClick={() => toggleShowMore(movie.id)}>
                  {showMoreMap[movie.id] ? "Less" : "More"}
                </Button>
                <Card.Text>Release Date: {movie.release_date}</Card.Text>
                <Card.Text>Vote Average: {movie.vote_average}</Card.Text>
                {tokenExpired ? (
                  <Button
                    variant="primary"
                    disabled
                    title="You need to be logged in to see details"
                  >
                    See Details
                  </Button>
                ) : (
                  <Link to={`/posts/${movie.id}`}>
                    <Button variant="primary">See Details</Button>
                  </Link>
                )}
              </Card.Body>
              {!tokenExpired && (
                <Card.Footer
                  style={{
                    borderTop:
                      theme === "dark" ? "1px solid #555" : "1px solid #ddd",
                  }}
                >
                  <StarTwoTone
                    onClick={() => toggleFavorite(movie.id)}
                    twoToneColor={
                      favorites.includes(movie.id) ? "#fadb14" : "#000"
                    }
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  />
                </Card.Footer>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cards;
