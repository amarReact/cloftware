
// import { Outlet, Navigate } from "react-router-dom";
// const PrivateComponent =()=> {
//     const auth = localStorage.getItem("user");
//     return auth ? <Outlet /> : <Navigate to="/" />
// }

// export default PrivateComponent;

import { Outlet, Navigate } from "react-router-dom";
const PrivateComponent = ({ children, allowedRoles }) => {
  const auth = localStorage.getItem("user");
  if (!auth) {
    return <Navigate to="/" />;
  }
  const user = auth ? JSON.parse(auth) : {};
  const userRole = user?.role_id;
  const userHasRequiredRole =
    user && allowedRoles.includes(userRole) ? true : false;
  // if (!userHasRequiredRole) {
  //   return <Navigate to="/" />;
  // }
  return <Outlet />;
};

export default PrivateComponent;
