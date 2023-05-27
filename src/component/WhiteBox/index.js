import styles from "./wb.module.css"
import classnames from 'classnames';
export const WhiteBox =({title, className, children, width, radius, padding})=>{
    return(
        <div 
        className={classnames({
            [styles.wbBox]: true,
            [className]: true,
            [styles[width]] : width,
            [styles[radius]] : radius,
            [styles["padd"+padding]] : padding
          })} 
        >
       {title && <hgroup><h3>{title}</h3></hgroup>}
          {children}
      </div>
    )
}

// width add half, quarter and bydefault is full 

// remove border to use radius none
// padding: none
