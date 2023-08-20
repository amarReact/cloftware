import styles from "../../pageComponent/schoolDash/news/news.module.css"
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
// import classnames from "classnames";  
import { useNavigate } from "react-router-dom";
import { AiOutlineImport, AiOutlinePlusCircle } from "react-icons/ai";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState, useEffect } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Cookies from 'js-cookie';
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../redux/constants/constants";
import { useAuthData, useUserDetailData } from "../../utlis";

const FeeSetup = ({setAddFee}) => {
  const  {userDataGlobal} = useUserDetailData()
  const {authList} = useAuthData()
  const token = Cookies.get('jwtToken');
  const YEARID = userDataGlobal?.body?.year_id

  const formList = {
    amount: "",

  };

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [dueDate, setDueDate] = useState(new Date());
  const [selectFeeType, setSelectFeeType] = useState("");
  const [selectBatchClass, setSelectBatchClass] = useState("");
  const [selectFrequency, setSelectFrequency] = useState("");
  const [selectStudentCategory, setSelectStudentCategory] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isReminder, setIsReminder] = useState(false);
  const [batchClassName, setBatchClassName] = useState("")
  const [getFeeCat, setGetFeeCat] = useState("")
  const [getFeeType, setGetFeeType] = useState("")
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1000);


  const batchClassFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/get_fee_class_list`, 
        {
          // transport_id: 2,
          year_id: YEARID,
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

  const getRemSte = selectedOptions?.map((i, v)=> i.value)


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
         feeSetupPostFunc()
        toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
    } else {
      // toast.error("Please fill in the required field!", {position: "top-center"})
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!selectFeeType) {
      errors.fee_name = "Fee name is required";
    }
    if (!selectBatchClass) {
      errors.selectBatchClass = "Please select an Batch/Class option.";
    }
    if (!selectFrequency) {
      errors.selectFrequency = "Please select an Frequency option.";
    }
    if (!selectStudentCategory) {
      errors.selectStudentCategory =
        "Please select an Student Category option.";
    }

    if (!selectedOptions?.length > 0) {
      errors.reminderSettings = "Reminder Settings is required";
    }

    return errors;
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const feeSetupPostFunc = async () => {
    let remSet = getRemSte?.join(",")
    const classList = {
      fee_name: selectFeeType?.value,
      amount: feeAmount?.amount,
      due_date: formatDate(dueDate),
      class_id: batchClassNumber?.class_id,
      frequency: selectFrequency?.value,
      student_category: selectStudentCategory?.value,
      reminder_settings: remSet,
      year_title: userDataGlobal?.body?.year_title,
    }

    axios
      .post(`${BASE_URL}/fees/add_edit_fee_setup`, classList, {
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
            setAddFee(false)
            clearTimeout(timer)
          },3000)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const getOptionLabel = (option) => {
    return (
      <>
        <input
          type="checkbox"
          checked={selectedOptions.some((item) => item.value === option.value)}
          onChange={() => {}}
        />
        <label>{option.label}</label>
      </>
    );
  };
  const getOptionValue = (option) => option.value;

  const menuListStyles = {
    maxHeight: 200, // set maximum height to 200px
    overflowY: "auto", // enable vertical scrolling
  };

  const handleMultiChange = (selected) => {
    setSelectedOptions(selected);
  };

  const batchClassOptions =
  batchClassName &&
  batchClassName?.body?.map((item, ind) => {
    return {
      label: `${item?.class_name}`,
      value: `${item?.class_name}`,
    };
  });

  const batchClassNumber = batchClassName?.body?.find((i,v)=> i.class_name == selectBatchClass.value );

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


  const frequencyOptions = [
    { value: "One Time", label: "One Time" },
    { value: "Weekely", label: "Weekely" },
    { value: "Monthly", label: "Monthly" },
    { value: "Q.H.A", label: "Q.H.A" },
  ];

  const reminderSettingsOptions = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
  ];


  useEffect(() => {
    batchClassFunc();
    feeCategoriesListFunc();
    feeTypeListFunc();
  }, [YEARID]);


  console.log("selectedOptions", selectedOptions?.length > 0)


  return (
    <Fragment>
         <div className={styles.newsProfiForm}>
                <form onSubmit={handleSubmit}>
                {(studentCategoryOptions && batchClassOptions && feeTypeOptions) && 
                <ol className={styles.twoparts}>
              <li>
                  <label>Fee Name *</label>
                  <Select
                  value={selectFeeType}
                  options={feeTypeOptions}
                  onChange={(option) => setSelectFeeType(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />

                {errors?.fee_name && <ErrorBox title={errors?.fee_name} />}
              </li>

              <li>
                <InputFields
                  label="Amount *"
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Type Number here"
                  value={feeAmount?.amount && feeAmount?.amount }
                  onChange={handleChange}
                  disabled
                />
                {/* {errors?.amount && <ErrorBox title={errors?.amount} />} */}
              </li>
              <li>
                <label>Due Date *</label>
                <DatePicker
                  // disabled
                  dateFormat="yyyy-MM-dd"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker"  calendarClassName="datePicketCalander"
                />
              </li>
              <li>
                <label>Batch/Class *</label>
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
                <label>Frequency *</label>
                <Select
                  value={selectFrequency}
                  options={frequencyOptions}
                  onChange={(option) => setSelectFrequency(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectFrequency && (
                  <ErrorBox title={errors?.selectFrequency} />
                )}
              </li>
              {/* <li>
                <InputFields
                  disabled
                  label="Current Academic Year *"
                  id="academicYear"
                  name="academicYear"
                  placeholder="Type text here"
                  value={formData.academicYear}
                  onChange={handleChange}
                />
              </li> */}
              <li>
                <label>Reminder Settings *</label>
                {!isReminder ? (
                  <>
                   <Select 
                    value={selectedOptions}
                    options={reminderSettingsOptions} 
                    isMulti  
                    closeMenuOnSelect={false} 
                    onChange={(option) => setSelectedOptions(option)}
                    className="loginSelectGlb"
                      />
                    {/* <Select
                      options={reminderSettingsOptions}
                      isMulti
                      maxMenuHeight={130}
                      getOptionLabel={getOptionLabel}
                      getOptionValue={getOptionValue}
                      onChange={handleMultiChange}
                      closeMenuOnSelect={false}
                      value={selectedOptions}
                      className="loginSelectGlb"
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          ...menuListStyles,
                        }),
                      }}
                    /> */}
                    {errors?.reminderSettings && (
                      <ErrorBox title={errors?.reminderSettings} />
                    )}
                  </>
                ) : (
                  <ButtonGlobal
                    bgColor="border"
                    width="auto"
                    title=""
                    onClick={() => setIsReminder(!isReminder)}
                  >
                    <AiOutlinePlusCircle />
                  </ButtonGlobal>
                )}
              </li>

              <li>
                <label>Student Category *</label>
                <Select
                  value={selectStudentCategory}
                  options={studentCategoryOptions}
                  onChange={(option) => setSelectStudentCategory(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectStudentCategory && (
                  <ErrorBox title={errors?.selectStudentCategory} />
                )}
              </li>
              <li className={styles.fullWidth}>   <ButtonGlobal
              type="submit"
              bgColor="green"
              width="auto"
              title="Submit"
            /></li>
            </ol>}
         
          </form>
          <ToastContainer />
          </div>
    </Fragment>
  );
};

export default FeeSetup;
