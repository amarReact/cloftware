
import styles from "./message.module.css"
import classnames from 'classnames';
export const ErrorBox =({title, align= "left", className="", icon})=> {
    return(
        <>
        {title && <cite 
          className={classnames({
            [styles.errorBox]: true,
            [className]: className,
            [styles[align]]: align
          })} >{icon && <b><img src={icon} alt="" /></b>}{title}</cite>}
        </>
    )
}


// title = add title here
// align = center and right pass to center and right text, align left is bydefault 
// className = If you modify button different style to use this property className={styles.abc}
// icons = pass image path 