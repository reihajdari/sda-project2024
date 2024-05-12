import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Image,
  Form,
} from "react-bootstrap";
import { GlobalContext } from "../App";
import Footer from "../components/Home/Footer";
import { Modal } from "antd";
import HeaderSinglePost from "../components/SinglePost/HeaderSinglePost";
import { reservationData } from "../api/reservations.js";
import { getSinglePost } from "../api/movies";
import { useForm } from "react-hook-form";

function SinglePost() {
  const { theme } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(null);

  const params = useParams();
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", params.postId],
    queryFn: () => getSinglePost(params.postId),
    enabled: !!params.postId,
  });

  const baseStyle = {
    transition: "all 0.3s",
  };
  const darkStyle = {
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "100vh",
  };
  const lightStyle = {
    backgroundColor: "#f8f9fa",
    color: "#000",
    minHeight: "100vh",
  };

  const currentStyle =
    theme === "dark"
      ? { ...baseStyle, ...darkStyle }
      : { ...baseStyle, ...lightStyle };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(false);
    reservationData(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <Container style={currentStyle} className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container style={currentStyle} className="mt-5 text-center">
        <Alert variant="danger">Error fetching data!</Alert>
      </Container>
    );
  }

  const videos = movie?.videos?.results || [];

  return (
    <section style={currentStyle}>
      <HeaderSinglePost />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg="8">
            <h2>{movie?.title}</h2>
            <p>
              <strong>Release Date:</strong> {movie?.release_date}
            </p>
            <p>
              <strong>Overview:</strong> {movie?.overview}
            </p>
            <p>
              <strong>Vote Average:</strong> {movie?.vote_average}
            </p>
            <p>
              <strong>Original Language:</strong> {movie?.original_language}
            </p>
            <p>
              <strong>Popularity:</strong> {movie?.popularity}
            </p>
            <p>
              <strong>Status:</strong> {movie?.status}
            </p>
            <Button onClick={showModal}>Make Reservation</Button>
          </Col>
          <Col lg="4">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt={movie?.title}
              fluid
            />
          </Col>
        </Row>
        <Modal
          title="Make Reservation"
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                isInvalid={!!errors.name}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your surname"
                isInvalid={!!errors.surname}
                {...register("surname", { required: "Surname is required" })}
              />
              {errors.surname && (
                <Form.Control.Feedback type="invalid">
                  {errors.surname.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                isInvalid={!!errors.username}
                {...register("username", { required: "Email is required" })}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                min={16}
                max={100}
                {...register("age", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="formTickets">
              <Form.Label>Number of tickets</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of tickets"
                max={5}
                min={1}
                {...register("tickets", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="formMovie">
              <Form.Label>Movie</Form.Label>
              <Form.Control
                readOnly
                {...register("movieTitle", { value: movie?.title })}
              />
            </Form.Group>
            <Form.Group controlId="formTheatre">
              <Form.Label>Select Theatre</Form.Label>
              <Form.Select
                placeholder="Select Theatre"
                {...register("theatre", { required: true })}
              >
                <option value="Theatre 1">Theatre 1</option>
                <option value="Theatre 2">Theatre 2</option>
                <option value="Theatre 3">Theatre 3</option>
              </Form.Select>
            </Form.Group>
            <br />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal>

        {videos.length > 0 ? (
          <div>
            <div
              key={videos[0].key}
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].key}`}
                title={videos.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <p>No videos available</p>
        )}
      </Container>
      <Footer />
    </section>
  );
}

export default SinglePost;
