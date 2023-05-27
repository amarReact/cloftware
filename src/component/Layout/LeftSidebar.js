import styles from "./layout.module.css";
import { Logo } from "../Logo";
import { Link, useLocation } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { FaSchool, FaChild, FaRegNewspaper } from "react-icons/fa";
import { AiFillDashboard, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";
import {RxDotFilled} from "react-icons/rx"
import { useState } from "react";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(null)
  const auth = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const userRole = 2;

  const menuList = [
    {
      title: "School Dashbaord",
      url: "/school-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [2],
    },
    {
      title: "Teacher Dashbaord",
      url: "/teacher-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [3],
    },
    {
      title: "Super Admin Dashbaord",
      url: "/super-admin-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [1],
    },
    {
      title: "School Management",
      url: "/school",
      subUrl: "/add-school",
      icon: <FaSchool />,
      roles: [1],
    },
    {
      title: "Student Dashbaord",
      url: "/student-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [4],
    },
    {
      title: "Teacher Management",
      url: "/teacher",
      subUrl: "/add-teacher",
      icon: <GiTeacher />,
      roles: [2],
    },
    {
      title: "Student Management",
      url: "/student",
      subUrl: "/add-student",
      icon: <FaChild />,
      roles: [2, 3],
    },
    {
      title: "Class Management",
      url: "/class-management",
      subUrl: "/add",
      icon: <SiGoogleclassroom />,
      roles: [2],
    },
    {
      title: "News Events",
      url: "/news-events",
      subUrl: "/add",
      icon: <FaRegNewspaper />,
      roles: [2],
    },
    {
      title: "Fee Management",
      roles: [2],
      icon: <GiMoneyStack />,
      subItems: [
        { title: "Fee Setup", url: "/fee-setup", },
        { title: "Fee Submission", url: "/fee-submission", },
        { title: "Fee Plan",  url: "/fee-plan"},
        { title: "Fee Request",  url: "/fee-request" },
      ],
    },
    {
      title: "Holiday Management",
      url: "/holiday",
      subUrl: "/add",
      icon: <SiGoogleclassroom />,
      roles: [2],
    },
  ];

  const filteredMenuList = menuList.filter((item) =>
    item.roles.includes(userRole)
  );

  const menuAccordHandler=(id)=>{
    if(id === isOpen){
      return setIsOpen(null)
    }
    setIsOpen(id)
  }

  return (
    <div className={styles.leftSidebar}>
      <aside className={auth ? styles.ifAuth : styles.noAuth}>
        {auth ? (
          <img
            src={process.env.PUBLIC_URL + "/images/schoollogo.jpeg"}
            fill
            contain
            alt=""
          />
        ) : (
          <Logo />
        )}
      </aside>
      <nav>
        <ul className={styles.menuCntr}>
          {filteredMenuList.map((item, ind) => {
            return (
              <li key={item?.title}>
                <Link
                  className={
                    (location?.pathname === item?.url ||
                      location?.pathname === item?.subUrl) &&
                    styles.active
                  }
                  to={item?.subItems ? "#" : item?.url}
                  onClick={()=> item?.subItems ? menuAccordHandler(ind) : {}}
                >
                  <b>{item?.icon}</b>
                  {item?.title}
                  {item?.subItems &&<i>{ind === isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</i>}
                </Link>

                {item?.subItems &&  (
                  <>
                   {ind === isOpen && <ul>
                    {item?.subItems.map((v, a) => {
                      return (
                        <li key={v?.title}>
                          <Link
                            className={
                              (location?.pathname === v?.url ||
                                location?.pathname === v?.subUrl) &&
                              styles.active
                            }
                            to={v?.url}
                          >
                            <b><RxDotFilled /></b>
                            {v?.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>}
                  </>
                
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
