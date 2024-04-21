import axios from "axios";

export async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=66427f1e7115fee56a85a9b4454dcdb5`;
  const res = await axios.get(url);

  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}

export async function createNewUser(data) {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    data
  );
  return res.data;
}

export async function getSinglePost(filmId) {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/" +
      filmId +
      "?api_key=66427f1e7115fee56a85a9b4454dcdb5&append_to_response=videos"
  );
  return res.data;
}
