import styles from "./fee.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
// import classnames from "classnames";  
import { useNavigate } from "react-router-dom";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState, useEffect } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import Select from "react-select";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import axios from "axios";
import { useAuthData } from "../../utlis";

const FeeSubmission = () => {
  const {authList} = useAuthData();
  const token = Cookies.get('jwtToken');

  const formList = {
    lateFee: "",
  };
  const auth = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [selectFeeType, setSelectFeeType] = useState("");
  const [selectFeeCategory, setSelectFeeCategory] = useState("");
  const [selectPayment, setSelectPayment] = useState("");
  const [selectStudentID, setSelectStudentID] = useState("")
  const [getSchoolID, setGetSchoolID] = useState("")
  const [getFeeCat, setGetFeeCat] = useState("")
  const [getFeeType, setGetFeeType] = useState("")
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1000);
  
  const navigate = useNavigate();

  const schoolIdSelectFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/get_student_list`, 
        {
          offset,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
      setGetSchoolID(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const studentIdOptions =
  getSchoolID &&
  getSchoolID?.body?.map((item, ind) => {
    return {
      label: `${item?.unique_student_id}`,
      value: `${item?.unique_student_id}`,
    };
  });

  const filterName = getSchoolID?.body?.find((i,v)=> i.unique_student_id == selectStudentID.value );

  const feeCategoriesListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/fee_categories_list`, 
        {
          offset: 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setGetFeeCat(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const studentCategoryOptions =
  getFeeCat &&
  getFeeCat?.body?.map((item, ind) => {
    return {
      label: `${item?.fee_category_name}`,
      value: `${item?.fee_category_name}`,
    };
  });

  const getFeeCategoryIds = () => {
    const feeCategoryIds = selectFeeCategory
      .filter((category) =>
      getFeeCat?.body?.some((fee) => fee.fee_category_name === category.value)
      )
      .map((category) =>
      getFeeCat?.body?.find((fee) => fee.fee_category_name === category.value)
          .fee_category_id
      );
    return feeCategoryIds;
  };

  console.log("selectFeeCategory", selectFeeCategory)

  const feeTypeListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/get_fee_type_list`, 
        {
          offset,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setGetFeeType(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const feeTypeOptions =
  getFeeType &&
  getFeeType?.body?.map((item, ind) => {
    return {
      label: `${item?.fee_name}`,
      value: `${item?.fee_name}`,
    };
  });

  const feeAmount = getFeeType?.body?.find((i,v)=> i.fee_name == selectFeeType.value );

  const totalFeeList = feeAmount?.amount + (formData.lateFee ? parseFloat(formData.lateFee) : 0)

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
        feeSubmissionPostFunc();
        toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
    } else {
      // toast.error("Please fill in the required field!", {
      //   position: "top-center",
      // });
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   
    // if (!values.amount) {
    //   errors.amount = "Amount is required";
    // }
    // if (!values.lateFee) {
    //   errors.lateFee = "Late Fee is required";
    // }
    if (!selectFeeType) {
      errors.selectFeeType = "Please select an Fee Type option.";
    }
    if (!selectPayment) {
      errors.selectPayment = "Payment is required";
    }
    if(!selectStudentID){
      errors.selectStudentID = "Student ID is required";
    }
    if (!selectFeeCategory) {
      errors.selectFeeCategory =
        "Please select an Fee Category option.";
    }

    return errors;
  };

  // const feeTypeOptions = [
  //   { value: "Admission Fees", label: "Admission Fees" },
  //   { value: "Tuition fees", label: "Tuition Fees" },
  //   { value: "Exam Fees", label: "Exam Fees" },
  //   { value: "Computer Class Fees", label: "Computer Class Fees" },
  // ];

  // const studentCategoryOptions = [
  //   { value: "EWS", label: "EWS" },
  //   { value: "RTE", label: "RTE" },
  //   { value: "Staff", label: "Staff" },
  //   { value: "Special", label: "Special" },
  //   { value: "3 child", label: "3 child" },
  //   { value: "Normal", label: "Normal" },
  // ];

  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Checks", label: "Checks"},
    { value: "Debit cards", label: "Debit cards" },
    { value: "UPI", label: "UPI" },
  ];


  const feeSubmissionPostFunc = async () => {
    let feeCat = getFeeCategoryIds().join(",")
    const classList = {
      fee_submission_id: 13,
      student_id:filterName?.stu_id,
      school_id: authList?.school_id,
      fee_type_name:selectFeeType?.value,
      late_fee:parseFloat(formData?.lateFee),
      fee_category:feeCat,
      amount:feeAmount?.amount,
      total_fee:totalFeeList,
      payment_mode:selectPayment?.value,
      // stu_full_name: filterName?.stu_full_name,
     
    }

    axios
      .post(`${BASE_URL}/fees/add_fee_submission`, classList, {
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
            // setAddClass(false)
            clearTimeout(timer)
          },3000)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  

  useEffect(() => {
    schoolIdSelectFunc();
    feeCategoriesListFunc();
    feeTypeListFunc();
  }, []);


  return (
    <Fragment>
      <div className={styles.feeProfileSt}>
        <section className="headingTop">
          <h3>Fee Submission</h3>
          {/* <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Import"
          >
            <AiOutlineImport />
          </ButtonGlobal> */}
        </section>

        <WhiteBox topBorder={true}>
          <form onSubmit={handleSubmit}>
            {(studentIdOptions && studentCategoryOptions && feeTypeOptions) && <ul className={styles.feeForm}>
              
              {/* {studentIdOptions &&   */}
              <li>
                <label>Student ID *</label>
                <Select
                  value={selectStudentID}
                  options={studentIdOptions}
                  onChange={(option) => setSelectStudentID(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectStudentID && (
                  <ErrorBox title={errors?.selectStudentID} />
                )}
              </li>
              {/* } */}
             {/* {studentIdOptions &&  */}
             <li>
                <InputFields
                  label="Student Name *"
                  id="studentName"
                  name="studentName"
                  placeholder="Type text here"
                  disabled
                  value={filterName?.stu_full_name}
                />
              </li>
              {/* } */}

              {/* {studentCategoryOptions && */}
               <li>
                <label>Fee Category *</label>
                <Select
                  value={selectFeeCategory}
                  options={studentCategoryOptions}
                  onChange={(option) => setSelectFeeCategory(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                  isMulti
                  closeMenuOnSelect={false}
                />
                {errors?.selectFeeCategory && (
                  <ErrorBox title={errors?.selectFeeCategory} />
                )}
              </li>
              {/* } */}

              {/* {feeTypeOptions &&  */}
              <li>
                <label>Fee Type *</label>
                <Select
                  value={selectFeeType}
                  options={feeTypeOptions}
                  onChange={(option) => setSelectFeeType(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectFeeType && (
                  <ErrorBox title={errors?.selectFeeType} />
                )}
              </li>
              {/* } */}

              <li>
                <InputFields
                  label="Amount *"
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Type text here"
                  value={feeAmount?.amount && feeAmount?.amount }
                  onChange={handleChange}
                  disabled
                />
                {/* {errors?.amount && <ErrorBox title={errors?.amount} />} */}
              </li>
              <li>
                <InputFields
                  label="Late Fee *"
                  disabled={feeAmount?.amount ? false : true }
                  id="lateFee"
                  name="lateFee"
                  type="number"
                  placeholder="Type text here"
                  value={formData.lateFee}
                  onChange={handleChange}
                />
                {/* {errors?.lateFee && <ErrorBox title={errors?.lateFee} />} */}
              </li>  
              <li>
                <InputFields
                  disabled
                  label="Totel Fee"
                  id="lateFee"
                  name="lateFee"
                  type="number"
                  placeholder="Type text here"
                  value={totalFeeList}
                />
              </li>  
              
              <li>
                <label>Payment *</label>
                <Select
                  value={selectPayment}
                  options={paymentOptions}
                  onChange={(option) => setSelectPayment(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectPayment && (
                  <ErrorBox title={errors?.selectPayment} />
                )}
              </li>            
            </ul>}
            <ButtonGlobal
              type="submit"
              bgColor="green"
              width="auto"
              title="Submit"
            />
          </form>
          <ToastContainer />
        </WhiteBox>
      </div>
    </Fragment>
  );
};

export default FeeSubmission;
