
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import BackToTop from "../BackToTop";

export const Footer =(props)=>{
    return(
     <div className={styles.footerDiv + " " + props.className}>
        <p>&copy; 2023 CloftWare.com, All right Reserved</p>
        <ol>
            <li><Link to="#">Terms of Use</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
        </ol>
        {/* <ul>
            <li><Link legacyBehavior href="#"><a target="_blank"><Image src={linkdin} alt="" /></a></Link></li>
            <li><Link legacyBehavior href="#"><a target="_blank"><Image src={facebook} alt="" /></a></Link></li>
        </ul> */}
        <BackToTop />
     </div>
    )
}

