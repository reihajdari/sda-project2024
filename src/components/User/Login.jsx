import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Col } from "react-bootstrap";
import Registration from "./Registration";

function Login() {
  const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Col sm={12} md={6} lg={3}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              isInvalid={!!errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        {formData && (
          <div style={{ marginTop: "20px" }}>
            <h4>Login Data:</h4>
            <p>Email: {formData.username}</p>
            <p>Password: {formData.password}</p>
          </div>
        )}
      </Col>
      <Registration />
    </Container>
  );
}

export default Login;
