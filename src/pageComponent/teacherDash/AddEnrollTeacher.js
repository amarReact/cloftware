
import styles from "../schoolDash/addEditSch.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
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

const AddEnrollTeacher = ({checkData, setAddEnroll}) =>{
  const  {userDataGlobal} = useUserDetailData()
  const navigate = useNavigate();
  const token = Cookies.get('jwtToken');
  const [selectBatchClass, setSelectBatchClass] = useState("");
  const [batchClassName, setBatchClassName] = useState("")

  const [selectBatchSection, setSelectBatchSection] = useState("");
  const [batchSectionName, setBatchSectionName] = useState("")
  const [sections, setSections] = useState([]);

  let YEARID = userDataGlobal?.body?.year_id

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
          // toast.error("Please fill in the required field!", {position: "top-center"})
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
        const classData = JSON.stringify([{ class_id: batchClassNumber?.class_id, section_id: matchedObjects }]);
        const teacherList = {
          teacher_id: checkData?.join(","),
          class_data: classData,
          year_id: YEARID,
        }
        
        axios
          .post(`${BASE_URL}/teacher/add_class_teacher_mapping`, teacherList, {
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
                setAddEnroll(false);
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

        // const batchSectionNumber = batchSectionName?.body?.section_details?.find((i,v)=> i.section_name == selectBatchSection.value );
        // const batchSectionNumber = batchSectionName?.body?.section_details?.filter((i) => i.section_name == selectBatchSection.value);
        // const batchSectionNumber = batchSectionName?.body?.section_details?.find((item) => item.section_name === selectBatchSection.value);
        // const selectedSection = batchSectionName?.body?.section_details?.find((item) => item.section_name === selectBatchSection.value);
        
        const matchedObjects = selectBatchSection && batchSectionName?.body?.section_details.filter((item) =>
        selectBatchSection?.some((section) => section.value === item.section_name)
        ).map((cat)=>{
          return cat.section_id
        })
        
        console.log("selectBatchSection", selectBatchSection, batchSectionName?.body?.section_details, matchedObjects)

        // const getFeeCategoryIds = () => {
        //   const feeCategoryIds = selectBatchSection
        //     ?.filter((category) =>
        //     batchSectionName?.body?.section_details?.some((fee) => fee.section_name === category.value)
        //     )
        //     .map((category) =>
        //     batchSectionName?.body?.section_details?.find((fee) => fee.section_name === category.value)
        //         .fee_category_id
        //     );
        //   return feeCategoryIds;
        // };

        // console.log("batchSectionNumber", getFeeCategoryIds())
       

        // const handleAddSection = () => {
        //   const newSection = {
        //     id: sections.length + 1,
        //     section: selectBatchSection.value,
        //   };
        //   setSections((prevSections) => [...prevSections, newSection]);
        //   setSelectBatchSection('');
        // };

        // const handleRemoveSection = (id) => {
        //   setSections((prevSections) => prevSections.filter((section) => section.id !== id));
        // };
      
        const handleAddSection = () => {
          const newSection = selectBatchSection?.value;
          setSections((prevSections) => [...prevSections, newSection]);
          setSelectBatchSection('');
        };
      
        const handleRemoveSection = (index) => {
          setSections((prevSections) => {
            const updatedSections = [...prevSections];
            updatedSections.splice(index, 1);
            return updatedSections;
          });
        };

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
       
      <ul className={styles.formFields +" "+ styles.ullistFlex}>
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
                  isMulti
                  className="loginSelectGlb"
                  closeMenuOnSelect={false}
                />
                {errors?.selectBatchSection && <ErrorBox title={errors?.selectBatchSection} />}
        </li>
        <li className={styles.addCls}><ButtonGlobal width="auto" size="small" title="Add" onClick={handleAddSection}>+</ButtonGlobal></li>
      
      </ul>      

        <ButtonGlobal className={styles.nxtBtn} bgColor="green" onClick={handleSubmit} width="auto" title="Submit" />
       <ToastContainer />
        </section>

       </div>
    </div>
       
    )
}

export default AddEnrollTeacher;