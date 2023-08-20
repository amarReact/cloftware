import styles from "../../pageComponent/schoolDash/news/news.module.css"
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import Select from 'react-select';
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../redux/constants/constants";
import moment from "moment";
import { useAuthData, useUserDetailData } from "../../utlis";

const AddAdmissionEnquiry =({setIsAdd, yearId})=>{
  const  {userDataGlobal} = useUserDetailData()
  const formList = {
    student_name: '',
    mother_name: '',
    father_name: '',
    student_phone: '',
    address: '',
    // country: '',
    state: '',
    city: '',
    student_alternate_phone: '',
  }

  const token = Cookies.get('jwtToken');
  const [names, setNames] = useState([]);
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [selectAdmissionClass, setSelectAddmissionClass] = useState("");
  const [dob, setDob] = useState(new Date());
  const [selectGender, setSelectGender] = useState();
  const [batchClassName, setBatchClassName] = useState("")
  const [selectBatchClass, setSelectBatchClass] = useState("");
  let YEARID = userDataGlobal?.body?.year_id

  const batchClassFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/get_fee_class_list`, 
        {
          // transport_id: 2,
          year_id: yearId
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


  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
         addmissionPostFunc()
        toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
    } else {
      // toast.error("Please fill in the required field!", {position: "top-center"})
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


    const addmissionPostFunc = async () => {
      const classList = {
        year_id:yearId,
        class_id: batchClassNumber?.class_id,
        student_name: formData?.student_name,
        mother_name: formData?.mother_name,
        student_phone: formData?.student_phone,
        father_name: formData?.father_name,
        gender: selectGender?.value,
        dob:formatDate(dob),
        address: formData?.address,
        country: "India",
        state: formData?.state,
        city: formData?.city,
        student_alternate_phone: formData?.student_alternate_phone,
      }

      axios
        .post(`${BASE_URL}/enquiry/add_edit_admiss_enquiry`, classList, {
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
              setIsAdd(false)
              clearTimeout(timer)
            },3000)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    };

  



    const validate =(formData)=>{
        const errors = {};
          if (!formData.student_name) {
            errors.student_name = 'Student Name is required';
          }
          if (!formData.mother_name) {
            errors.mother_name = 'Mother Name is required';
          }
          if (!formData.student_phone) {
            errors.student_phone = 'Student phone is required';
          }
          if (!formData.father_name) {
            errors.father_name = 'Father name is required';
          }
          if (!formData.address) {
            errors.address = 'Address is required';
          }
          // if (!formData.country) {
          //   errors.country = 'Country is required';
          // }
          if (!formData.state) {
            errors.state = 'State is required';
          }
          if (!formData.city) {
            errors.city = 'City is required';
          }
          if (!formData.student_alternate_phone) {
            errors.student_alternate_phone = 'Student Alternate Phone is required';
          }
          if (!selectGender) {
            errors.selectGender = 'Gender is required';
          }

          if (!selectBatchClass) {
            errors.selectBatchClass = 'Admission Class is required';
          }
         return errors;
    }

    // const batchClassOptions =
    // batchClassName &&
    // batchClassName?.body?.map((item, ind) => {
    //   return {
    //     label: `${item?.class_name}`,
    //     value: `${item?.class_name}`,
    //   };
    // });

    const batchClassOptions =
  batchClassName?.body?.map((item, ind) => {
    return {
      label: `${item?.class_name}`,
      value: `${item?.class_name}`,
    };
  }) || [YEARID];
  
    const batchClassNumber = batchClassName?.body?.find((i,v)=> i.class_name == selectBatchClass.value );

    useEffect(()=>{
      batchClassFunc()
    }, [])

    console.log("batchClassOptions", batchClassOptions)

    return(
        <div className={styles.newsProfiForm}>
                <form onSubmit={handleSubmit}>
                    <ol className={styles.threeparts}>
                   
<li>
                <label>Admission for class  *</label>
          <Select
                  value={selectBatchClass}
                  options={batchClassOptions}
                  onChange={(option) => setSelectBatchClass(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectBatchClass && <ErrorBox title={errors?.selectBatchClass} />}
              </li>

                        <li>
                           <InputFields 
                            label="Student Name" 
                            id="student_name" 
                            name="student_name" 
                            placeholder="Type text here" 
                            value={formData.student_name}
                            onChange={handleChange}  
                            require
                          />
                            {errors?.student_name && <ErrorBox title={errors?.student_name} />}
                        </li>

                        <li>
                        <label>Gender <em>*</em></label>
                      <Select
                        value={selectGender}
                        options={genderOptions}
                        onChange={(option) => setSelectGender(option)}
                        maxMenuHeight={130}
                        className="loginSelectGlb"
                        // placeholder="Select an option"
                      />
                      {errors?.selectGender && (
                      <ErrorBox title={errors?.selectGender} /> )}
                      </li>

                        <li>
                         <InputFields 
                          label="Father Name" 
                          id="father_name" 
                          name="father_name" 
                          placeholder="Type text here" 
                          value={formData.father_name}
                          onChange={handleChange}  
                          require
                        />
                          {errors?.father_name && <ErrorBox title={errors?.father_name} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Mother Name" 
                          id="mother_name" 
                          name="mother_name" 
                          placeholder="Type text here" 
                          value={formData.mother_name}
                          onChange={handleChange}  
                          require
                        />
                          {errors?.mother_name && <ErrorBox title={errors?.mother_name} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Student Phone" 
                          id="student_phone" 
                          name="student_phone" 
                          placeholder="Type text here" 
                          value={formData.student_phone}
                          type="number"
                          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
                          require
                        />
                          {errors?.student_phone && <ErrorBox title={errors?.student_phone} />}
                      </li>

                      <li>
                        <label>Date of Birth <em>*</em></label>
                          <DatePicker
                            // disabled
                            dateFormat="yyyy-MM-dd"
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander"
                          />
                          {/* {errors?.student_phone && <ErrorBox title={errors?.student_phone} />} */}
                      </li>

                      <li>
                         <InputFields 
                          label="Address" 
                          id="address" 
                          name="address" 
                          placeholder="Type text here" 
                          value={formData.address}
                          onChange={handleChange}  
                          fieldname="textarea"
                          height="medium"
                          require
                        />
                          {errors?.address && <ErrorBox title={errors?.address} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Country" 
                          id="country" 
                          name="country" 
                          placeholder="Type text here" 
                          value="India"
                          onChange={handleChange} 
                          // require
                          disable
                        />
                          {/* {errors?.country && <ErrorBox title={errors?.country} />} */}
                      </li>

                      <li>
                         <InputFields 
                          label="State" 
                          id="state" 
                          name="state" 
                          placeholder="Type text here" 
                          value={formData.state}
                          onChange={handleChange}  
                          require
                        />
                          {errors?.state && <ErrorBox title={errors?.state} />}
                      </li>

                      <li>
                         <InputFields 
                          label="City" 
                          id="city" 
                          name="city" 
                          placeholder="Type text here" 
                          value={formData.city}
                          onChange={handleChange}  
                          require
                        />
                          {errors?.city && <ErrorBox title={errors?.city} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Student Alternate Phone" 
                          id="student_alternate_phone" 
                          name="student_alternate_phone" 
                          placeholder="Type text here" 
                          value={formData.student_alternate_phone}
                          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
                          type="number"
                          require
                        />
                          {errors?.student_alternate_phone && <ErrorBox title={errors?.student_alternate_phone} />}
                      </li>

                        <li className={styles.fullLi}><ButtonGlobal title="Save" bgColor="green" size="medium" radius="medium" width="auto" />
                       
                        </li>
                    </ol>
                </form>
           
            <ToastContainer />
        </div>
           
    )
}

export default AddAdmissionEnquiry;