import React from 'react';
import styles from './error.module.css';
import Header from '../../component/Header';
import { Footer } from '../../component/Footer';
import ButtonGlobal from '../../component/ButtonGlobal';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../component/Logo';
export default function ErrorPage() {
    const navigate = useNavigate()
  return (
    <div className={styles.errorPage}>
    <div className={styles.errorPageIn}>
      <aside>
        <hgroup>
        <Logo width="medium" className={styles.logerr} white={true} />
      <h2>Page Not Found </h2>
      <p className={styles.errorDescription}>The page you are looking for could not be found.</p>
      <ButtonGlobal title="Back To Home" width="auto" onClick={()=> navigate("/")} />
        </hgroup>
      </aside>
      <label><img src={process.env.PUBLIC_URL + "/images/error.png"} alt="" /></label>
    </div>
    </div>
  );
}
