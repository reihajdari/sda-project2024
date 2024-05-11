import axios from "axios";

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
