
import styles from "./message.module.css"
import classnames from 'classnames';

export const SuccessBox=({title, align= "left", className="", icon})=>{
  console.log("icon", icon)
    return(
        <>
        {title && <h6 
          className={classnames({
            [styles.successBox]: true,
            [className]: className,
            [styles[align]]: align
          })} >{icon && <b><img src={icon} alt="" /></b>}{title}</h6>}
          
        </>
    )
}


// align = center and right pass to center and right text, align left is bydefault 
// className = If you modify button different style to use this property className={styles.abc}
// icons = pass image path 