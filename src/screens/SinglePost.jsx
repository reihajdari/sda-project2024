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
import { ThemeContext } from "../App";
import Footer from "../components/Home/Footer";
import { Modal } from "antd";
import HeaderSinglePost from "../components/SinglePost/HeaderSinglePost";
import { getSinglePost } from "../api/users";
import { useForm } from "react-hook-form";

function SinglePost() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseStyle = {
    transition: "all 0.3s",
  };
  const darkStyle = {
    backgroundColor: "#333",
    color: "#fff",
  };
  const lightStyle = {
    backgroundColor: "#f8f9fa",
    color: "#000",
  };

  const currentStyle =
    theme === "dark"
      ? { ...baseStyle, ...darkStyle }
      : { ...baseStyle, ...lightStyle };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const params = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", params.postId],
    queryFn: () => getSinglePost(params.postId),
    enabled: !!params.postId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(false);
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

  const videos = data?.videos?.results || [];

  return (
    <section style={currentStyle}>
      <HeaderSinglePost />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg="8">
            <h2>{data?.title}</h2>
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
          <Col lg="4">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt={data?.title}
              fluid
            />
          </Col>
        </Row>
        <Button onClick={showModal}>Make Reservation</Button>
        <br />
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
                {...register("age", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Number of tickets</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of tickets"
                {...register("tickets", { required: true })}
              />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal>
        {formData && (
          <div>
            <h4>Submitted Data:</h4>
            <p>Name: {formData.name}</p>
            <p>Surname: {formData.surname}</p>
            <p>Email: {formData.username}</p>
            <p>Age: {formData.age}</p>
            <p>Nr.Tickets: {formData.tickets}</p>
          </div>
        )}

        {videos.length > 0 ? (
          <div>
            <div key={videos[0].key}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videos[0].key}`}
                title={videos[0].name}
                allowFullScreen
              ></iframe>
              <p>{videos[0].name}</p>
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
