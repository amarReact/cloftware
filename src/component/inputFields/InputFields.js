import styles from './inputFields.module.css';
import classNames from 'classnames';
// import ErrorBox from '../MessageBox/ErrorBox';
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import { useState } from 'react';
const InputFields = props => {
  const [isOpen, setIsOpen]= useState(false)
  const changeEye=()=>{
    setIsOpen(!isOpen)
  }
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

        <artical>
        {props?.fieldname ? (
          <textarea {...props}></textarea>
        ) : (
           <>
           {props.eye
           ?
           <input autocomplete="off" type={isOpen ? 'text' : "password"} onChange={event => props?.handleChange(event)} {...props} />
           :
           <input autocomplete="off" type={!props?.type ? 'text' : props.type} onChange={event => props?.handleChange(event)} {...props} /> 
          }
           </> 
        )}
        {props.eye && <em onClick={changeEye}> {isOpen ? <AiFillEye /> : <AiFillEyeInvisible /> }</em>}
        </artical>
        
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



