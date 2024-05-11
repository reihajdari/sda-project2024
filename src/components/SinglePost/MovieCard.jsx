import { useContext, useEffect, useState } from "react";
import CardComponent from "react-bootstrap/Card";
import { ThemeContext } from "../../App";
import { useQuery } from "@tanstack/react-query";

function MovieCard() {
  const [movie] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const cardStyle =
    theme === "dark"
      ? { backgroundColor: "#333", color: "#fff" }
      : { backgroundColor: "#f8f9fa", color: "#000" };

  const {
    data: getSinglePost,
    error,
    isLoading,
  } = useQuery({ queryKey: ["singleMovie"], queryFn: getSinglePost });

  if (isLoading) {
    return <div>Loading popular movies...</div>;
  }

  if (error) {
    return <div>Error fetching popular movies: {error.message}</div>;
  }

  return (
    <div style={cardStyle}>
      {movie && (
        <CardComponent style={cardStyle}>
          <CardComponent.Body>
            <CardComponent.Title>{movie.title}</CardComponent.Title>
            <CardComponent.Text>{movie.overview}</CardComponent.Text>
            <CardComponent.Text>{movie.release_date}</CardComponent.Text>
            <CardComponent.Text>
              Average: {movie.vote_average}
            </CardComponent.Text>
          </CardComponent.Body>
        </CardComponent>
      )}
    </div>
  );
}

export default MovieCard;
