import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../api/users";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { ThemeContext } from "../App";
import Footer from "../components/Home/Footer";
import { Modal } from "antd";
import HeaderSinglePost from "../components/SinglePost/HeaderSinglePost";

function SinglePost() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const params = useParams();
  const style =
    theme === "dark"
      ? { backgroundColor: "black", color: "white" }
      : { backgroundColor: "white", color: "black" };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", params.postId],
    queryFn: () => getSinglePost(params.postId),
    enabled: !!params.postId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <section style={style}>
      <HeaderSinglePost />
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

          <Button type="success" onClick={showModal}>
            Make Reservation
          </Button>
          <Modal
            title="Make Reservation"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">
                  Surname:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  placeholder="Enter surname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date:
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Guests:
                </label>
                <input type="number" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Card Number:
                </label>
                <input type="number" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Expiry:
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  CVV:
                </label>
                <input type="number" className="form-control" id="date" />
              </div>
            </form>
          </Modal>
          <Row className="mt-5">
            <Col>
              <h3>Videos</h3>
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
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </section>
  );
}

export default SinglePost;
