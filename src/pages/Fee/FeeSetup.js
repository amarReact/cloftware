import styles from "./fee.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
// import classnames from "classnames";  
import { useNavigate } from "react-router-dom";
import { AiOutlineImport, AiOutlinePlusCircle } from "react-icons/ai";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import Select from "react-select";

const FeeSetup = () => {
  const formList = {
    feeName: "",
    amount: "",
    dueDate: "",
    batchClass: "",
    frequency: "",
    academicYear: "2022-2023",
    studentCategory: "",
  };
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [dueDate, setDueDate] = useState(new Date());
  const [selectBatchClass, setSelectBatchClass] = useState("");
  const [selectFrequency, setSelectFrequency] = useState("");
  const [selectStudentCategory, setSelectStudentCategory] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isReminder, setIsReminder] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      //   loginPostFunc();
    } else {
      toast.error("Please fill in the required field!", {
        position: "top-center",
      });
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.feeName) {
      errors.feeName = "Fee Name is required";
    }
    if (!values.amount) {
      errors.amount = "Amount is required";
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

    if (selectedOptions.length === 0) {
      errors.reminderSettings = "Reminder Settings is required";
    }

    return errors;
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

  const batchClassOptions = [
    { value: "class 1", label: "class 1" },
    { value: "class 2", label: "class 2" },
    { value: "class 3", label: "class 3" },
    { value: "class 4", label: "class 4" },
    { value: "class 5", label: "class 5" },
    { value: "class 6", label: "class 6" },
    { value: "class 7", label: "class 7" },
    { value: "class 8", label: "class 8" },
    { value: "class 9", label: "class 9" },
    { value: "class 10", label: "class 10" },
    { value: "class 11", label: "class 11" },
    { value: "class 12", label: "class 12" },
  ];

  const frequencyOptions = [
    { value: "One Time", label: "One Time" },
    { value: "Weekely", label: "Weekely" },
    { value: "Monthly", label: "Monthly" },
    { value: "Q.H.A", label: "Q.H.A" },
  ];

  const studentCategoryOptions = [
    { value: "EWS", label: "EWS" },
    { value: "RTE", label: "RTE" },
    { value: "Staff", label: "Staff" },
    { value: "Special", label: "Special" },
    { value: "3 child", label: "3 child" },
    { value: "Normal", label: "Normal" },
  ];

  const reminderSettingsOptions = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
  ];

  return (
    <Fragment>
      <div className={styles.feeProfileSt}>
        <section className="headingTop">
          <h3>Fee Setup</h3>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Import"
          >
            <AiOutlineImport />
          </ButtonGlobal>
        </section>

        <WhiteBox>
          <form onSubmit={handleSubmit}>
            <ul className={styles.feeForm}>
              <li>
                <InputFields
                  label="Fee Name *"
                  id="feeName"
                  name="feeName"
                  placeholder="Type Text here"
                  value={formData.feeName}
                  onChange={handleChange}
                />
                {errors?.feeName && <ErrorBox title={errors?.feeName} />}
              </li>

              <li>
                <InputFields
                  label="Amount *"
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Type Text here"
                  value={formData.amount}
                  onChange={handleChange}
                />
                {errors?.amount && <ErrorBox title={errors?.amount} />}
              </li>
              <li>
                <label>Due Date *</label>
                <DatePicker
                  // disabled
                  dateFormat="yyyy-MM-dd"
                  className="datePicker"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
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
                {errors?.selectBatchClass && (
                  <ErrorBox title={errors?.selectBatchClass} />
                )}
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
              <li>
                <InputFields
                  disabled
                  label="Current Academic Year *"
                  id="academicYear"
                  name="academicYear"
                  placeholder="Type Text here"
                  value={formData.academicYear}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Reminder Settings *</label>
                {isReminder ? (
                  <>
                    <Select
                      options={reminderSettingsOptions}
                      isMulti
                      maxMenuHeight={130}
                      getOptionLabel={getOptionLabel}
                      getOptionValue={getOptionValue}
                      onChange={handleMultiChange}
                      value={selectedOptions}
                      className="loginSelectGlb"
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          ...menuListStyles,
                        }),
                      }}
                    />
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
            </ul>
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

export default FeeSetup;
