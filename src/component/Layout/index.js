import styles from "./layout.module.css";
import Header from "../Header";
import { Footer } from "../Footer";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const Layout = () => {
  const [auth, setAuth] = useState({});
  const [isMenu, setIsMenu] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setAuth(stored ? JSON.parse(stored) : {});
  }, []);

  useEffect(() => {
    document.body.classList.toggle('hiddonBody', isMenu);
    return () => {
      document.body.classList.toggle('hiddonBody', null);
    };
  }, [isMenu]);


  return (
    <div className={`${styles.layoutCntr} ${isMenu && styles.layoutCntrOpen}`}>
        <div className={`${styles.layoutCntrCenter} opehd`}>
            <LeftSidebar setIsMenu={setIsMenu} isMenu={isMenu} />
            <div data-attr="rightCover" className={styles.rightCover}>
                <Header isMenu={isMenu} setIsMenu={setIsMenu} auth={auth} />
                <Outlet auth={auth} />
              <Footer />
            </div>
        </div>
    </div>
  );
};

export default Layout;