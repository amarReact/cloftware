import React from "react";
import styles from "./error.module.css";
import Header from "../../component/Header";
import { Footer } from "../../component/Footer";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../component/Logo";
export default function ErrorPage() {
  const navigate = useNavigate();
  /*******user rolebase start********/
  const auth = JSON.parse(localStorage.getItem("user"));
  const userRole = 2;
  const userRoleBaseFunc = () => {
    switch (userRole) {
      case 1:
        return navigate("/super-admin-dashboard");
      case 2:
        return navigate("/school-dashboard");
      case 3:
        return navigate("/teacher-dashboard");
      case 4:
        return navigate("/student-dashboard");
      default:
        return null;
    }
  };
  /******user role base end******/

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageIn}>
        <aside>
          <hgroup>
            <Logo width="medium" className={styles.logerr} white={true} />
            <h2>Page Not Found </h2>
            <p className={styles.errorDescription}>
              The page you are looking for could not be found.
            </p>
            <ButtonGlobal
              title="Back To Home"
              width="auto"
              onClick={() => (auth ? userRoleBaseFunc() : navigate("/"))}
            />
          </hgroup>
        </aside>
        <label>
          <img src={process.env.PUBLIC_URL + "/images/error.png"} alt="" />
        </label>
      </div>
    </div>
  );
}
