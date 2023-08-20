
import styles from "../schoolDash/addEditSch.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import Select from "react-select";
import { useState, useEffect } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../redux/constants/constants";
import axios from "axios";
import Cookies from 'js-cookie';
import classnames from 'classnames';
import { useAuthData, useUserDetailData } from "../../utlis";

const AddEnrollStudent = ({checkData, setAddEnroll}) =>{
  const  {userDataGlobal} = useUserDetailData()
  const token = Cookies.get('jwtToken');
  const [selectBatchClass, setSelectBatchClass] = useState("");
  const [batchClassName, setBatchClassName] = useState("")

  const [selectBatchSection, setSelectBatchSection] = useState("");
  const [batchSectionName, setBatchSectionName] = useState("")

  let YEARID = userDataGlobal?.body?.year_id

  console.log("checkData", checkData?.join(","))

  const formList = {
    first_name: '',
  }

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});


  const batchClassFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/get_fee_class_list`, 
        {
          // transport_id: 2,
          year_id: YEARID
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setBatchClassName(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const batchSectionFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/class/class_details`, 
        {
          class_id: batchClassNumber?.class_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setBatchSectionName(response?.data);
    } catch (error) {
      console.log(error);
    }
  };


    /*******manage setHobbiesData end***/

      const handleSubmit = (event) => {
   
        event.preventDefault();
        const validationErrors = validate(formData);
       
        if (Object.keys(validationErrors).length === 0) {
             enrollPostFunc()
        } else {
          setErrors(validationErrors);
   
        }
      };

      const validate = (formData) => {
        const errors = {};
    
        if (!selectBatchClass) {
          errors.selectBatchClass = 'Class name is required';
        }

        if (!selectBatchSection) {
          errors.selectBatchSection = 'Section name is required';
        }

        return errors;
      };
   
      const enrollPostFunc = async () => {
        const studentList = {
          student_id: checkData?.join(","),
          class_id:  batchClassNumber?.class_id,
          section_id: batchSectionNumber?.section_id,
          // class_data: [{class_id: 2, section_id: [1]}, {class_id:3, section_id: [3]}],
          year_id: YEARID,
        }
        
        axios
          .post(`${BASE_URL}/student/add_class_student_mapping`, studentList, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          })
          .then((response) => {
           
            if(response?.status === 400){
              toast.error(response?.data?.message);
            } else{
              toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast'});
              let timer = setTimeout(()=>{
                setAddEnroll(false)
                clearTimeout(timer)
              },3000)
            }
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {autoClose: 1000, position: "top-center" });
            console.log(error)
          });
      };

      const batchClassOptions =
      batchClassName?.body?.map((item, ind) => {
        return {
          label: `${item?.class_name}`,
          value: `${item?.class_name}`,
        };
      }) || [YEARID];
      
        const batchClassNumber = batchClassName?.body?.find((i,v)=> i.class_name == selectBatchClass.value );


        const batchSectionOptions =  batchSectionName?.body?.section_details.map((item, ind)=>{
          return{
            label: `${item?.section_name}`,
            value: `${item?.section_name}`,
          }
        })

        const batchSectionNumber = batchSectionName?.body?.section_details?.find((i,v)=> i.section_name == selectBatchSection.value );      

        useEffect(()=>{
          batchClassFunc()
        }, [YEARID])


        useEffect(()=>{
          batchSectionFunc()
        }, [batchClassNumber])
  
    return(
      <div 
      className={classnames({
        [styles.purchaseCntr]: true,
        [styles.purchaseCntrHeight]: true,
      })} 
      >
      <div className={styles.allForm}>
      <section className={styles.sdSections}>
       
      <ul className={styles.formFields}>
        <li className={styles.twoIn}>
          <label>Select class  *</label>
          <Select
                  value={selectBatchClass}
                  options={batchClassOptions}
                  onChange={(option) => setSelectBatchClass(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectBatchClass && <ErrorBox title={errors?.selectBatchClass} />}
        </li>

        <li className={styles.twoIn}>
          <label>Select Section for class  *</label>
               <Select
                  value={selectBatchSection}
                  options={batchSectionOptions}
                  onChange={(option) => setSelectBatchSection(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectBatchSection && <ErrorBox title={errors?.selectBatchSection} />}
              
        </li>
      
        </ul>      

        <ButtonGlobal className={styles.nxtBtn} bgColor="green" onClick={handleSubmit} width="auto" title="Submit" />
       <ToastContainer />
        </section>

       </div>
    </div>
       
    )
}

export default AddEnrollStudent;