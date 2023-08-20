import styles from "./wb.module.css"
import classnames from 'classnames';
export const WhiteBox =({title, className, children, width, radius, padding, topBorder})=>{
    return(
        <div 
        data-attr="wbBox"
        className={classnames({
            [styles.wbBox]: true,
            [className]: true,
            [styles[width]] : width,
            [styles[radius]] : radius,
            [styles["padd"+padding]] : padding,
            [styles.topBorder]: topBorder
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
// topborder 
