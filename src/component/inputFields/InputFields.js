import styles from './inputFields.module.css';
import classNames from 'classnames';
// import ErrorBox from '../MessageBox/ErrorBox';
const InputFields = props => {
  return (
    <>
      <div
        className={classNames({
          [styles.inputFieldsFull]: true,
          [styles['inputFields' + props?.width]]: props?.width,
          [props?.className]: props?.className,
          [styles.erroeBoxTrue]: props?.errorBox,
          [styles.focusList]: props?.focus
        })}
      >
        {props?.label && <label>{props?.label === 'blank' ? <b></b> : props?.label}</label>}
        {props?.fieldname ? (
          <textarea {...props}></textarea>
        ) : (
            <input type={!props?.type ? 'text' : props.type} onChange={event => props?.handleChange(event)} {...props} />
        )}
        {props?.maxLength && props?.showMaxLength && (
          <strong>
            {props?.value?.length ? props?.value?.length : 0}/{props?.maxLength}
          </strong>
        )}
        {props.children}
        {/* {props?.errorMsg ? <ErrorBox title={props?.errorMsg} success={props?.success} icon={props?.icon} /> : null} */}
       
      </div>
    </>
  );
};

export default InputFields;

// type = different types for the HTML <input> element like text, number, email etc... ,
// label = define for input name
// className = If you modify button different style to use this property className={styles.abc}



