import styles from "./header.module.css";
import { useState, useEffect, Fragment, useRef } from "react";
import {BiChevronDown, BiChevronUp, BiLogInCircle} from "react-icons/bi"
import {AiTwotoneSetting} from "react-icons/ai"
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputFields from "../inputFields/InputFields";
import {ImProfile} from "react-icons/im"
const Header = ({auth}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const outerClick = useRef(null)

  useEffect(() => {
    const body = document.querySelector("body");
    if (menu) {
      body.classList.add("hideBody");
    } else {
      body.classList.remove("hideBody");
    }
  }, [menu]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (outerClick.current && !outerClick.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [outerClick]);

  /*******logout function start*****/ 
  const logOut = () => { localStorage.clear(); navigate("/")};
    /*******logout function end*****/ 

    
  return (
    <Fragment>
      <div className={styles.headerCntr}>
        <form>
          <InputFields type="search" placeholder="Search Here..." onChange={()=> console.log("dfsbf")} />
        </form>
        <aside ref={outerClick}>
         <h6>{auth?.email_id}</h6>
          <label onClick={()=> setIsOpen(!isOpen)}>
            <b><img src={process.env.PUBLIC_URL + '/images/log.png'} alt="" /></b>
            <i>{isOpen ? <BiChevronDown /> : <BiChevronUp /> }</i>
          </label>
         {isOpen && <ul>
            {/* <li><Link onClick={handleLinkClick} to="/my-profile"><ImProfile />My Profile</Link></li>
            <li><Link onClick={handleLinkClick} to="/school-dashboard"><AiTwotoneSetting />School Dashboard</Link></li> */}
            <li><button onClick={logOut}><BiLogInCircle />logOut</button></li>
          </ul>}
        </aside>
      </div>
    </Fragment>
  );
};

export default Header;
