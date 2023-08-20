import styles from "./header.module.css";
import { useState, useEffect, Fragment, useRef } from "react";
import {BiChevronDown, BiChevronUp, BiLogInCircle} from "react-icons/bi"
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputFields from "../inputFields/InputFields";
import Cookies from 'js-cookie';
import {RxHamburgerMenu} from "react-icons/rx"
import {MdClose} from "react-icons/md"
import { Logo, LogoGraph } from "../Logo";
import {IoMenu} from "react-icons/io5"

const Header = ({auth, isMenu, setIsMenu}) => {
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
  const logOut = () => { Cookies.remove('jwtToken');
  localStorage.clear(); navigate("/")};
    /*******logout function end*****/ 

    
  return (
    <Fragment>
      <div data-attr="headerCntr" className={styles.headerCntr}>
        <div data-attr="logoSection" className={styles.logoSection}>
          <hgroup>{!isMenu ? <Logo  className={styles.logoFullDivLft} />  : <LogoGraph  className={styles.logoFullDivLft} /> }  <Logo className={styles.logoFullDiv} /></hgroup>
          <button onClick={()=> setIsMenu(!isMenu)} className={styles.hamburgerMenu}>{!isMenu ? <MdClose /> : <IoMenu />}</button> 
        </div>
      
          <form>
            <InputFields type="search" placeholder="Search Here..." onChange={()=> console.log("dfsbf")} />
          </form>
        <aside ref={outerClick}>
         <button onClick={()=> setIsOpen(!isOpen)}>
            <label>
              <b>
                {/* <img src={process.env.PUBLIC_URL + '/images/log.png'} alt="" /> */}
                {auth?.email_id?.slice(0,1)}</b>
              <i>{isOpen ? <BiChevronDown /> : <BiChevronUp /> }</i>
          </label>
          <h6>{auth?.email_id?.split("@")[0]}</h6>
         </button>
          
         {isOpen && 
         <div className={styles.ulList}>
            <ul>
          <li><Link onClick={handleLinkClick} to="/my-profile">My Profile</Link></li>
            {/* 
            <li><Link onClick={handleLinkClick} to="/school-dashboard"><AiTwotoneSetting />School Dashboard</Link></li> */}
            <li><button onClick={logOut}>logOut</button></li>
          </ul>
         </div>
         }
        </aside>
      </div>
    </Fragment>
  );
};

export default Header;
