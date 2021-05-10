// import "index.scss";
import Login from "../components/Login"
import PrivateRoute from "../components/Login/PrivateRoute";


export const Component = () => <Login />
export const PrivateRouteComponent = () => <PrivateRoute />


export default {
  title: "Components/Login",
  component: Login
};