import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { ThemeContext } from "../App";

function Unauthorized() {
  const { theme } = useContext(ThemeContext);

  const baseStyle = {
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
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

  return (
    <Container fluid style={currentStyle}>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <Col xs={12} md={6} className="text-center">
          <FaLock size={60} color="#ff0000" />
          <h1 style={{ marginTop: "20px", color: "#ff0000" }}>Access Denied</h1>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            You are not authorized to access this page.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Unauthorized;
