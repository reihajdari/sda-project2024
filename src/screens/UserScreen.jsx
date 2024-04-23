import Login from "../components/User/Login";
import Registration from "../components/User/Registration";
import UserHeader from "../components/User/UserHeader";

function UserScreen() {
  return (
    <div>
      <UserHeader />
      <Login />
      <Registration />
    </div>
  );
}

export default UserScreen;
