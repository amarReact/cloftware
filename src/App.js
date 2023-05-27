import { Routes, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Layout from "./component/Layout";
import Forgotpassword from "./pages/Forgotpassword";
import School from "./pages/School";
import AddSchool from "./pageComponent/schoolDash/AddSchool";
import Student from "./pages/Student";
import AddStudent from "./pageComponent/studentDash/AddStudent";
import Teacher from "./pages/Teacher";
import AddTeacher from "./pageComponent/teacherDash/AddTeacher";
import PrivateComponent from "./utlis/PrivateComponent";
import ErrorPage from "./pages/Error";
import SchoolDash from "./pageComponent/schoolDash/SchoolDash";
import ClassManagement from "./pageComponent/schoolDash/class/ClassManagement";
import NewsEvents from "./pageComponent/schoolDash/news/NewsEvents";
import SuperAdminDash from "./pages/Dashboard/SuperAdminDash";
import StudentDash from "./pages/Dashboard/StudentDash";
import TeacherDash from "./pages/Dashboard/TeacherDash";
import FeeSetup from "./pages/Fee/FeeSetup";
import FeeSubmission from "./pages/Fee/FeeSubmission";
import FeePlan from "./pages/Fee/FeePlan";
import FeeRequest from "./pages/Fee/FeeRequest";
import HolidayManagement from "./pages/Holiday/HolidayManagement";

function App() {
  const auth = JSON.parse(localStorage.getItem("user"));
  const userRole = 2;

  const routeRoleBase = () => {
    switch (userRole) {
      case 1: //Super admin
        return (
          <>
            <Route path="/super-admin-dashboard" element={<SuperAdminDash />} />
            <Route path="/school" element={<School />} />
            <Route path="/add-school" element={<AddSchool />} />
          </>
        );
      case 2: // School
        return (
          <>
            <Route path="/school-dashboard" element={<SchoolDash />} />
            <Route path="/student" element={<Student />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/class-management" element={<ClassManagement />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/fee-setup" element={<FeeSetup />} />
            <Route path="/fee-submission" element={<FeeSubmission />} />
            <Route path="/fee-plan" element={<FeePlan />} />
            <Route path="/fee-request" element={<FeeRequest />} />
            <Route path="/holiday" element={<HolidayManagement />} />
          </>
        );
      case 3: // Teacher
        return (
          <>
            <Route path="/teacher-dashboard" element={<TeacherDash />} />
            <Route path="/student" element={<Student />} />
            <Route path="/add-student" element={<AddStudent />} />
          </>
        );
      case 4: //Student
        return (
          <>
            <Route path="/student-dashboard" element={<StudentDash />} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />

        <Route path="*" exact={true} element={<ErrorPage />} />
        <Route element={<PrivateComponent />}>
          <Route element={<Layout />}>
            {routeRoleBase()}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// role id base
// 1 Super admin
// 2 School admin
// 3 Teacher
// 4 Student
