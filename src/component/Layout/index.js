import styles from "./layout.module.css";
import Header from "../Header";
import { Footer } from "../Footer";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const Layout = () => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setAuth(stored ? JSON.parse(stored) : {});
  }, []);

  return (
    <div className={`${styles.layoutCntr}`}>
        <div className={`${styles.layoutCntrCenter} opehd`}>
            <LeftSidebar />
            <div className={styles.rightCover}>
                <Header auth={auth} />
                <Outlet />
              <Footer />
            </div>
        </div>
     
    </div>
  );
};

export default Layout;