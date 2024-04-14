import axios from "axios";

export async function getAllUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}

export async function createNewUser(data) {
  const res = await axios.post("https://jsonplaceholder.typicode.com/users", data);
  return res.data;
}

export async function getSingleUser(userId) {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + userId);
  return res.data;
}
