const apiKey = import.meta.env.VITE_APP_API_KEY;
import axios from "axios";

export async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const res = await axios.get(url);
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
