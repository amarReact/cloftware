import styles from "./header.module.css";
import { useState, useEffect, Fragment } from "react";
import {BiChevronDown, BiChevronUp, BiLogInCircle} from "react-icons/bi"
import {MdOutlineManageSearch} from "react-icons/md"
import {AiTwotoneSetting} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

const Header = ({auth}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (menu) {
      body.classList.add("hideBody");
    } else {
      body.classList.remove("hideBody");
    }
  }, [menu]);

  const menuHandler = () => {
    setMenu(!menu);
  };

  /*******logout function start*****/ 
  const logOut = () => { localStorage.clear(); navigate("/")};
    /*******logout function end*****/ 

  console.log("auth2", auth)

  return (
    <Fragment>
      <div className={styles.headerCntr}>
     
        <aside>
         <h6>{auth?.email_id}</h6>
          <label onClick={()=> setIsOpen(!isOpen)}>
            <b><img src={process.env.PUBLIC_URL + '/images/log.png'} alt="" /></b>
            <i>{isOpen ? <BiChevronDown /> : <BiChevronUp /> }</i>
          </label>
         {isOpen &&  <ul>
            <li><Link to=""><MdOutlineManageSearch />Mange</Link></li>
            <li><Link to=""><AiTwotoneSetting />Settings</Link></li>
            <li><button onClick={logOut}><BiLogInCircle />logOut</button></li>
          </ul>}
        </aside>
      </div>
    </Fragment>
  );
};

export default Header;
