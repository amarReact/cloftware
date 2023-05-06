import styles from "./layout.module.css"
import { Logo } from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import {BiPurchaseTagAlt} from "react-icons/bi"
const LeftSidebar = ()=>{
    return(
          <div className={styles.leftSidebar}>
            <aside><Logo /></aside>
             <nav>
             <ul className={styles.menuCntr}>
             <li><Link to="/school"><b><BiPurchaseTagAlt /></b>School Management</Link></li>
             {/* <li><Link to="/add-school"><b><BiPurchaseTagAlt /></b>Add School</Link></li> */}
                
                {/* <li><Link to="/purchase"><b><BiPurchaseTagAlt /></b>School Mangement</Link>
                <ul>
                <li><Link to="/purchase"><b><BiPurchaseTagAlt /></b>Add School</Link></li>
                    <li><Link to=""><b><BiPurchaseTagAlt /></b>School List</Link></li>
                    <li><Link to="/purchase"><b><BiPurchaseTagAlt /></b>Add School</Link></li>
                    <li><Link to=""><b><BiPurchaseTagAlt /></b>Update School</Link></li>
                 
                </ul>
                </li>
                <li><Link to=""><b><BiPurchaseTagAlt /></b>Progress</Link></li>
                <li><Link to=""><b><BiPurchaseTagAlt /></b>Account</Link></li> */}
            </ul>
             </nav>
          </div>
    )
}

export default LeftSidebar;