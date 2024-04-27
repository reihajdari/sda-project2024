import axios from "axios";
const apiKey = import.meta.env.VITE_APP_API_KEY;

export async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const res = await axios.get(url);

  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}

export async function getSinglePost(filmId) {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/" +
      filmId +
      `?api_key=${apiKey}&append_to_response=videos`
  );
  return res.data;
}

export async function signUp(data) {
  const res = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ",
    {
      email: data.username,
      password: data.password,
    }
  );
  return res.data;
}

export async function logIn(data) {
  const res = await axios.post(
    " https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ",
    {
      email: data.username,
      password: data.password,
    }
  );
  return res.data;
}
