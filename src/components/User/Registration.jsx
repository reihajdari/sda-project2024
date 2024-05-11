/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { signUp } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "antd";

function Registration() {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.log("Registration error:", error.response.data.error.message);
      setError(error.response.data.error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(false);

    mutation.mutate(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {mutation.isError && (
        <Alert
          message={error || "An unknown error occurred."}
          showIcon
          type="error"
          closable
        ></Alert>
      )}
      {mutation.isSuccess && (
        <Alert
          message="Registration successful!"
          showIcon
          type="success"
          closable
          style={{ width: "100%" }}
        />
      )}

      <Nav.Link className="p-2" onClick={showModal}>
        Don't have an account? Register here!
      </Nav.Link>

      <Modal
        title="Register"
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters long.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Passoword"
              isInvalid={!!errors.password}
              {...register("confirmedPassword", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters long.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <br />
          <Button variant="primary" type="submit">
            Register
          </Button>

          <p style={{ marginTop: "1em" }}>
            Already have an account?{" "}
            <a href="#login" onClick={() => setIsModalOpen(false)}>
              Log in here
            </a>
          </p>
        </Form>
      </Modal>
      {mutation.isLoading && <div>Registering...</div>}
    </div>
  );
}

export default Registration;
