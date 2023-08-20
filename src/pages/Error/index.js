import React from "react";
import styles from "./error.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../component/Logo";
import { useAuthData, useUserDetailData } from "../../utlis";
export default function ErrorPage() {
  const {authList} = useAuthData()
  const navigate = useNavigate();
  const  {userDataGlobal} = useUserDetailData()
  /*******user rolebase start********/
  
  const userRole = userDataGlobal?.body?.role_id;
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
            {/* <Logo width="medium" className={styles.logerr} white={true} /> */}
            <h1>Oops!</h1>
            <h2>You have some problems</h2>
            <p className={styles.errorDescription}>
              The page you are looking for could not be found.
            </p>
            <ButtonGlobal
              title="Go Home"
              width="auto"
              bgColor="green"
              onClick={() => (authList ? userRoleBaseFunc() : navigate("/"))}
            />
          </hgroup>
        </aside>
        <label>
        <div class={styles.bubble}></div>
          <img src={process.env.PUBLIC_URL + "/images/error.png"} alt="" />
        </label>
      </div>
    </div>
  );
}
