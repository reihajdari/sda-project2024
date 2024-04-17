import { useEffect, useState } from "react";
import { getSinglePost } from "../../api/users";
import CardComponent from "react-bootstrap/Card";


function MovieCard({ postId }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getSinglePost(postId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      });
  }, [postId]);

  return (
    <div>
      {movie && (
        <CardComponent style={{ width: "18rem" }}>
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
