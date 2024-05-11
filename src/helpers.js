import { jwtDecode } from "jwt-decode";
const idToken = localStorage.getItem("idToken");
const allowedUserId = import.meta.env.VITE_APP_ADMIN_ID;

export function checkExpire(expireTime) {
  const nowDate = Math.floor(Date.now() / 1000);

  if (nowDate > expireTime) {
    return true;
  } else {
    return false;
  }
}

if (idToken) {
  const decodedToken = jwtDecode(idToken);

  checkExpire(decodedToken.exp);
}

export const isTokenExpired = () => {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) {
    return true;
  }
};

export const trimDescription = (text, maxLength) => {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};

export const isAdmin = () => {
  const idToken = localStorage.getItem("idToken");

  if (!idToken) {
    return false;
  }

  const decodedToken = jwtDecode(idToken);

  return allowedUserId === decodedToken.user_id;
};
