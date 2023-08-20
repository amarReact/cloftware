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
import ClassManagement from "./pageComponent/schoolDash/class/ClassList";
import NewsEvents from "./pageComponent/schoolDash/news/NewsEvents";
import SuperAdminDash from "./pages/Dashboard/SuperAdminDash";
import StudentDash from "./pages/Dashboard/StudentDash";
import TeacherDash from "./pages/Dashboard/TeacherDash";
import FeeSetup from "./pages/Fee/FeeSetup";
import FeeSubmission from "./pages/Fee/FeeSubmission";
import FeePlan from "./pages/Fee/FeePlan";
import FeeRequest from "./pages/Fee/FeeRequest";
import HolidayManagement from "./pages/Holiday/HolidayManagement";
import TransportList from "./pages/Transport/TransportList";
import AttendanceManagement from "./pages/Attendance/AttendanceManagement";
import AttendanceList from "./pages/Attendance/AttendanceList";
import AcademicYearManagement from "./pages/Academic/AcademicYearManagement";
import AcademicYearList from "./pages/Academic/AcademicYearList";
import AdmissionEnquiryList from "./pages/AdmissionEnquiry/AdmissionEnquiryList";
import VisitorList from "./pages/Visitor/VisitorList";
import Demo from "./pages/Academic/Demo";
import { useUserDetailData } from "./utlis";
import MyProfile from "./pageComponent/schoolDash/MyProfile";
import { useEffect } from "react";
import PackageManagementList from "./pages/PlanSetting/PackageManagementList";
import ModuleManagementList from "./pages/PlanSetting/ModuleManagementList";

const  App =(props)=> {
  const  {userDataGlobal} = useUserDetailData()
  console.log("userDataGlobal", userDataGlobal)

  useEffect(()=>{
     if(userDataGlobal){
       
     }
  },[])

  return (
    <div className="App">
    <Routes>
  
      <Route index path="/" element={<Login />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      {/*Super admin role */}
      <Route element={<PrivateComponent allowedRoles={[1]} />}>
        <Route element={<Layout />}>
          <Route path="/super-admin-dashboard" element={<SuperAdminDash />} />
          <Route path="/school" element={<School />} />
          <Route path="/add-school" element={<AddSchool />} />
          <Route path="/package-management"  element={<PackageManagementList />} />
          <Route path="/module-management"  element={<ModuleManagementList />} />
        </Route>
      </Route>

      {/*School Roles */}
      <Route element={<PrivateComponent allowedRoles={[2]} />}>
        <Route element={<Layout />}>
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
          <Route path="/transport" element={<TransportList />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/attendance-management"
            element={<AttendanceManagement />}
          />
          <Route path="/attendance-list" element={<AttendanceList />} />
          <Route
            path="/academic-year-management"
            element={<AcademicYearManagement />}
          />
          <Route path="/academic-year-list" element={<AcademicYearList />} />
          <Route path="/demo" element={<Demo />} />
          <Route
            path="/admission-enquiry"
            element={<AdmissionEnquiryList />}
          />
          <Route path="/visitor" element={<VisitorList />} />
        </Route>
      </Route>

      {/*Teacher */}
      <Route element={<PrivateComponent allowedRoles={[3]} />}>
        <Route element={<Layout />}>
          <Route path="/teacher-dashboard" element={<TeacherDash />} />
          <Route path="/student" element={<Student />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Route>
      </Route>

      {/*Student */}
      <Route element={<PrivateComponent allowedRoles={[4]} />}>
        <Route element={<Layout />}>
          <Route path="/student-dashboard" element={<StudentDash />} />
        </Route>
      </Route>

      <Route path="*" exact={true} element={<ErrorPage />} />
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
