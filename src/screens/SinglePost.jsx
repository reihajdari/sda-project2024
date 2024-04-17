import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../api/users";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Header from "../components/Home/Header";

function SinglePost() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", params.postId],
    queryFn: () => getSinglePost(params.postId),
    enabled: !!params.postId,
  });

  if (isLoading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Alert variant="danger">Error fetching data!</Alert>
          </Col>
        </Row>
      </Container>
    );
  }
  const videos = data?.videos?.results || [];

  return (
    <>
      <Header />
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col lg="8">
              <h2 className="mb-4">{data?.title}</h2>
              <p>
                <strong>Release Date:</strong> {data?.release_date}
              </p>
              <p>
                <strong>Overview:</strong> {data?.overview}
              </p>
              <p>
                <strong>Vote Average:</strong> {data?.vote_average}
              </p>
              <p>
                <strong>Original Language:</strong> {data?.original_language}
              </p>
              <p>
                <strong>Popularity:</strong> {data?.popularity}
              </p>
              <p>
                <strong>Status:</strong> {data?.status}
              </p>
            </Col>
            <Col lg="4" className="text-center">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                alt={data?.title}
                fluid
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h3>Videos</h3>
              {videos.length > 0 ? (
                <div>
                  {videos.map((video) => (
                    <div key={video.key}>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        allowFullScreen
                      ></iframe>
                      <p>{video.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No videos available</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SinglePost;
