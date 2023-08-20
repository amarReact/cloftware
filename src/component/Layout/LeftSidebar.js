import styles from "./layout.module.css";
import { Logo } from "../Logo";
import { Link, useLocation } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { FaSchool, FaChild, FaRegNewspaper } from "react-icons/fa";
import { AiFillDashboard, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { SiGoogleclassroom, SiTransportforlondon } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";
import {RxDotFilled} from "react-icons/rx"
import { Fragment, useState, useEffect } from "react";
import {GiTreehouse} from "react-icons/gi"
import {BsBusFront} from "react-icons/bs"
import {HiAcademicCap} from "react-icons/hi"
import { useAuthData, useUserDetailData } from "../../utlis";

import {MdOutlineNavigateNext, MdOutlineNavigateBefore, MdSettingsInputAntenna} from "react-icons/md";
import {BiChevronDown} from "react-icons/bi"

const LeftSidebar = ({isMenu, setIsMenu}) => {
  const  {userDataGlobal} = useUserDetailData()
  const [isOpen, setIsOpen] = useState(null)
  const {authList} = useAuthData()
  const location = useLocation();

  const userRole = userDataGlobal?.body?.role_id 

  const menuList = [
    {
      title: "School",
      url: "/school-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [2],
    },
    {
      title: "Teacher",
      url: "/teacher-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [3],
    },
    {
      title: "Super Admin",
      url: "/super-admin-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [1],
    },
    {
      title: "Plan Setting",
      roles: [1],
      icon: <MdSettingsInputAntenna />,
      subItems: [
        { title: "Package Management",  url: "/package-management"},
        { title: "Module Management", url: "/module-management", },
        { title: "package Configuration",  url: "/package-configuration" },
      ],
    },
    {
      title: "School",
      url: "/school",
      subUrl: "/add-school",
      icon: <FaSchool />,
      roles: [1],
    },
    {
      title: "Student",
      url: "/student-dashboard",
      subUrl: "/add",
      icon: <AiFillDashboard />,
      roles: [4],
    },
    {
      title: "Teacher",
      url: "/teacher",
      subUrl: "/add-teacher",
      icon: <GiTeacher />,
      roles: [2],
    },
    {
      title: "Student",
      url: "/student",
      subUrl: "/add-student",
      icon: <FaChild />,
      roles: [2, 3],
    },
    {
      title: "Class",
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
      title: "Fee",
      roles: [2],
      icon: <GiMoneyStack />,
      subItems: [
        { title: "Fee Plan",  url: "/fee-plan"},
        { title: "Fee Submission", url: "/fee-submission", },
        { title: "Fee Request",  url: "/fee-request" },
      ],
    },
    {
      title: "Holiday",
      url: "/holiday",
      subUrl: "/add",
      icon: <GiTreehouse />,
      roles: [2],
    },
    {
      title: "Transport",
      url: "/transport",
      subUrl: "/add",
      icon: <BsBusFront />,
      roles: [2],
    },
    {
      title: "Attendance",
      roles: [2],
      icon: <GiMoneyStack />,
      subItems: [
        { title: "Attendance", url: "/attendance-management", },
        { title: "Attendance List", url: "/attendance-list", },
      ],
    },
    {
      title: "Academic Year",
      roles: [2],
      icon: <HiAcademicCap />,
      url: "/academic-year-list",
    },
    {
      title: "Admission Enquiry",
      url: "/admission-enquiry",
      icon: <GiTeacher />,
      roles: [2],
    },
    {
      title: "Visitor",
      url: "/visitor",
      icon: <GiTeacher />,
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
    <Fragment>
 <div className={`${styles.leftSidebar} ${isMenu && styles.leftSidebarOpen}` }>
      <aside className={authList ? styles.ifAuth : styles.noAuth}>
        {authList ? (
          <img
            src={process.env.PUBLIC_URL + "/images/schoolLogo.png"}
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
                  <em>{item?.title}</em>
                  {item?.subItems &&<i>{ind === isOpen ? <BiChevronDown /> : <MdOutlineNavigateNext />}</i>}
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
                            onClick={()=> setIsOpen(null)}
                          >
                            {/* <b><RxDotFilled /></b> */}
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

     <div onClick={()=> setIsMenu(!isMenu)} 
      className={styles.wraperBlack}></div>
    </Fragment>
   
  );
};

export default LeftSidebar;
