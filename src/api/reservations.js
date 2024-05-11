import axios from "axios";
import { jwtDecode } from "jwt-decode";
const idToken = localStorage.getItem("idToken");



export async function reservationData(data) {
  const decodedToken = jwtDecode(idToken);
  const res = await axios.post(" http://localhost:3000/reservations", {
    userId: decodedToken.user_id,
    emailToken: decodedToken.email,
    name: data.name,
    surname: data.surname,
    email: data.username,
    age: data.age,
    numberOfTickets: data.tickets,
    theatre: data.theatre,
    movieTitle: data.movieTitle,
  });
  return res.data;
}

export async function getAllReservationData() {
  const res = await axios.get("http://localhost:3000/reservations");
  return res.data;
}

export async function getSingleReservationUser(userId) {
  const res = await axios.get(
    "http://localhost:3000/reservations?userId=" + userId
  );
  return res.data;
}
export async function deleteReservation(id) {
  const res = await axios.delete("http://localhost:3000/reservations/" + id);
  return res.data;
}
export const updateReservation = (id, updatedData) => {
  return axios.put(`http://localhost:3000/reservations/${id}`, updatedData);
};
