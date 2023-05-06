import React,{useEffect} from "react";
import styles from "./buttonGlobal.module.css"
import classnames from 'classnames';
const ButtonGlobal = ({title="Text Hera", width="full", size="medium", bgColor="", className="", disable=false, onClick, children, icon={}}) => {

    return (
        <div  
         className={classnames({
            [styles.buttonGlobalMain]: true,
            [className]: className,
            [styles[width]]: width,
            [styles.disableClass] : disable,
            [styles[size]]: size,
            [styles[bgColor]]: bgColor,
            [styles[icon?.align === "right" ? icon?.align : "left"]]: icon && icon?.src,
          })} 
          >
          <button {...(onClick ? { onClick } : {})}>
            {children ? <>{title} {children}</> : 
            <span>{icon && icon?.src && <b><img src={icon?.src} alt="" width={16} height={16}/></b>}{title}</span>}
          </button>
        </div>
    )
}

export default ButtonGlobal;

// title = "" Add title for button text,
// width = (bydefault full width is 100% ) If you want to manage width to use these propertys like half, auto and quarter
// className = If you modify button different style to use this property className={styles.abc}
// disable = use this property for disable Btn
// size = varients small, mediun (bydefault) and large 
// bgColor = (bydefault is blue) add property green, gray, border and red
// icon = have tow property icon={ src: "", align: bydefault is left || right }  Example icon={{src:lcIcon, align: "left"}}

