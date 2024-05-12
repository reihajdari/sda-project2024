import { useEffect, useContext } from "react";
import { Spinner, Alert, Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  deleteReservation,
  getAllReservationData,
} from "../../api/reservations.js";
import { GlobalContext } from "../../App";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const AdminReservationPage = () => {
  const navigate = useNavigate();
  const theme = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const allowedUserId = import.meta.env.VITE_APP_ADMIN_ID;
  const idToken = localStorage.getItem("idToken");
  const decodedToken = jwtDecode(idToken);

  useEffect(() => {
    if (decodedToken.user_id !== allowedUserId) {
      navigate("/unauthorized");
      return;
    }
  }, [decodedToken, allowedUserId, navigate]);

  const {
    data: reservations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getAllReservationData,
  });

  const mutation = useMutation({
    mutationFn: deleteReservation,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["reservations"], (oldData) => {
        return oldData.filter((reservation) => reservation.id !== variables);
      });
      queryClient.invalidateQueries(["reservations"]);
    },
    onError: (mutationError) => {
      console.error("Error deleting reservation:", mutationError);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">Error fetching reservation data!</Alert>
      </Container>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <p>No reservations found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="table-responsive">
        <Table striped bordered hover variant={theme.theme}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Age</th>
              <th>Number of Tickets</th>
              <th>Theatre</th>
              <th>Movie Title</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.name}</td>
                <td>{reservation.surname}</td>
                <td>{reservation.email}</td>
                <td>{reservation.age}</td>
                <td>{reservation.numberOfTickets}</td>
                <td>{reservation.theatre}</td>
                <td>{reservation.movieTitle}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminReservationPage;
