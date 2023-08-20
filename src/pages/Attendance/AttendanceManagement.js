import styles from "../Fee/fee.module.css";
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
import {BiExport, BiImport} from "react-icons/bi"

const AttendanceManagement = () => {
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
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectClasses, setSelectClasses] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [selectType, setSelectType] = useState("");

  
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
    // if (!selectBatchClass) {
    //   errors.selectBatchClass = "Please select an Batch/Class option.";
    // }
    // if (!selectFrequency) {
    //   errors.selectFrequency = "Please select an Frequency option.";
    // }
    // if (!selectStudentCategory) {
    //   errors.selectStudentCategory =
    //     "Please select an Student Category option.";
    // }

    // if (selectedOptions.length === 0) {
    //   errors.reminderSettings = "Reminder Settings is required";
    // }

    return errors;
  };

  const classesOptions = [
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

  const sectionOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const typeOptions = [
    { value: "Leave", label: "Leave" },
    { value: "Absent", label: "Absent" },
    { value: "Present", label: "Present" },
    { value: "Half Day", label: "Half Day" },
  ];

  return (
    <Fragment>
      <div className={styles.feeProfileSt}>
        <section className="headingTop">
          <h3>Attendance Management</h3>
          <aside>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Export"
          >
            <BiExport />
          </ButtonGlobal>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Import"
          >
            <BiImport />
          </ButtonGlobal>
          {/* <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Import"
          >
            <AiOutlineImport />
          </ButtonGlobal> */}
          </aside>

          
        </section>

        <WhiteBox topBorder={true}>
          <form onSubmit={handleSubmit}>
            <ul className={styles.feeForm}>
              <li>
                <label>Classes *</label>
                <Select
                  value={selectClasses}
                  options={classesOptions}
                  onChange={(option) => setSelectClasses(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectClasses && (
                  <ErrorBox title={errors?.selectClasses} />
                )}
              </li>

              <li>
                <label>Section *</label>
                <Select
                  value={selectSection}
                  options={sectionOptions}
                  onChange={(option) => setSelectSection(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectSection && (
                  <ErrorBox title={errors?.selectSection} />
                )}
              </li>

              <li>
                <InputFields
                  label="Student ID *"
                  id="studentId"
                  name="studentId"
                  placeholder="Type text here"
                  value={formData.studentId}
                  onChange={handleChange}
                />
                {errors?.studentId && <ErrorBox title={errors?.studentId} />}
              </li>

              <li>
                <InputFields
                  label="Student Name *"
                  id="studentName"
                  name="studentName"
                  placeholder="Type text here"
                  value={formData.studentName}
                  onChange={handleChange}
                />
                {errors?.studentName && <ErrorBox title={errors?.studentName} />}
              </li>

              <li>
                <label>Date *</label>
                <DatePicker
                  // disabled
                  dateFormat="MMM d, yyyy" 
                  selected={selectDate}
                  onChange={(date) => setSelectDate(date)}
                  scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker"  calendarClassName="datePicketCalander"
                />
              </li>

              <li>
                <label>Type *</label>
                <Select
                  value={selectType}
                  options={typeOptions}
                  onChange={(option) => setSelectType(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectType && (
                  <ErrorBox title={errors?.selectType} />
                )}
              </li>

              <li>
                <InputFields
                  label="Student Class & Section *"
                  id="studentName"
                  name="studentName"
                  placeholder="Type text here"
                  value={formData.studentName}
                />
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

export default AttendanceManagement;
