import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getPopularMovies } from "../../api/users";
import { Link } from "react-router-dom";
import { StarTwoTone } from "@ant-design/icons";

function Cards() {
  const [movies, setMovies] = useState([]);
  const [showMoreMap, setShowMoreMap] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      });
  }, []);

  const trimDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  const toggleShowMore = (id) => {
    setShowMoreMap({
      ...showMoreMap,
      [id]: !showMoreMap[id],
    });
  };

  const toggleFavorite = (id) => {
    const index = favorites.indexOf(id);
    if (index !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card style={{ width: "18rem" }}>
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
                {!showMoreMap[movie.id] && (
                  <Button
                    variant="link"
                    onClick={() => toggleShowMore(movie.id)}
                  >
                    Shiko më shumë
                  </Button>
                )}
                {showMoreMap[movie.id] && (
                  <Button
                    variant="link"
                    onClick={() => toggleShowMore(movie.id)}
                  >
                    Shiko më pak
                  </Button>
                )}
                <Card.Text>{movie.release_date}</Card.Text>
                <Card.Text>Average: {movie.vote_average}</Card.Text>
                <Link to={`/posts/${movie.id}`}>
                  <Button variant="primary">Informacion i Detajuar</Button>
                </Link>
                <StarTwoTone
                  onClick={() => toggleFavorite(movie.id)}
                  twoToneColor={
                    favorites.includes(movie.id) ? "#fadb14" : "#000"
                  }
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cards;
