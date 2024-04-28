import { useEffect, useState } from "react";
import { Spinner, Alert, Container, Table, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { deleteReservation, getAllReservationData } from "../api/users";

function Reservations() {
  const [reservation, setReservation] = useState(null);
  const [isError, setIsError] = useState(false);
  const idToken = localStorage.getItem("idToken");
  const decodedToken = jwtDecode(idToken);

  useEffect(() => {
    getAllReservationData()
      .then((data) => {
        setReservation(data);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching reservation data:", error);
        setIsError(true);
      });
  }, [decodedToken.user_id]);

  const handleDelete = (id) => {
    deleteReservation(id)
      .then(() => {
        setReservation((prevReservations) =>
          prevReservations.filter((r) => r.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting reservation:", error));
  };

  if (isError) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">Error fetching reservation data!</Alert>
      </Container>
    );
  }

  if (reservation === null) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (reservation.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <p>No reservations found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Age</th>
            <th>Nr. of Tickets</th>
            <th>Theatre</th>
            <th>Movie Title</th>
          </tr>
        </thead>
        <tbody>
          {reservation.map((data) => (
            <tr key={data.id}>
              <td>{data.userId}</td>
              <td>{data.name}</td>
              <td>{data.surname}</td>
              <td>{decodedToken.email}</td>
              <td>{data.age}</td>
              <td>{data.numberOfTickets}</td>
              <td>{data.theatre}</td>
              <td>{data.movieTitle}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(data.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Reservations;
