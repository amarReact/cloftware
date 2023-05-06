import styles from "./wb.module.css"
import classnames from 'classnames';
export const WhiteBox =({title, className, children, width})=>{
    return(
        <div 
        className={classnames({
            [styles.wbBox]: true,
            [className]: true,
            [styles[width]] : width
          })} 
        >
       {title && <hgroup><h3>{title}</h3></hgroup>}
          {children}
      </div>
    )
}

// width add half bydefault is full 
