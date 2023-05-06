
import { Routes, Route, Redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Layout from "./component/Layout"
import Dashboard from "./pages/Dashboard"
import Forgotpassword from "./pages/Forgotpassword";
import UserProfile from "./pages/UserProfile";
import Account from "./pages/Account";
import School from "./pages/School"
import AddSchool from "./pageComponent/schoolDash/AddSchool";
import PrivateComponent from "./utlis/PrivateComponent";
import ErrorPage from "./pages/Error";
function App() {
  return (
    <div className="App">
    <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path='*' exact={true} element={<ErrorPage />} />
        
        <Route element={<PrivateComponent />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/school" element={<School />} />
            <Route path="/add-school" element={<AddSchool />} />
            <Route path="/student" element={<School />} />
            <Route path="/add-student" element={<AddSchool />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
