import styles from "./fee.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
// import classnames from "classnames";  
import { useNavigate } from "react-router-dom";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import Select from "react-select";

const FeeSubmission = () => {
  const formList = {
    studentId: 9024,
    studentName: "Satesh Gupta",
    amount: "",
    lateFee: "",
    frequency: "",
    academicYear: "2022-2023",
    studentCategory: "",
  };
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [selectFeeType, setSelectFeeType] = useState("");

  const [selectFeeCategory, setSelectFeeCategory] = useState("");

  const [selectPayment, setSelectPayment] = useState("");
  
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
    if (!values.lateFee) {
      errors.lateFee = "Late Fee is required";
    }
    if (!selectFeeType) {
      errors.selectFeeType = "Please select an Fee Type option.";
    }
    if (!selectPayment) {
      errors.selectPayment = "Payment is required";
    }
    if (!selectFeeCategory) {
      errors.selectFeeCategory =
        "Please select an Fee Category option.";
    }

    return errors;
  };

  const feeTypeOptions = [
    { value: "Admission Fees", label: "Admission Fees" },
    { value: "Tuition fees", label: "Tuition Fees" },
    { value: "Exam Fees", label: "Exam Fees" },
    { value: "Computer Class Fees", label: "Computer Class Fees" },
  ];

  const studentCategoryOptions = [
    { value: "EWS", label: "EWS" },
    { value: "RTE", label: "RTE" },
    { value: "Staff", label: "Staff" },
    { value: "Special", label: "Special" },
    { value: "3 child", label: "3 child" },
    { value: "Normal", label: "Normal" },
  ];

  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Checks", label: "Checks"},
    { value: "Debit cards", label: "Debit cards" },
    { value: "UPI", label: "UPI" },
  ];

  let totalFeeList = parseFloat(formData.amount) + parseFloat(formData.lateFee)

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

        <WhiteBox>
          <form onSubmit={handleSubmit}>
            <ul className={styles.feeForm}>
              <li>
                <InputFields
                  label="Student ID *"
                  id="studentId"
                  name="studentId"
                  placeholder="Type Text here"
                  value={formData.studentId}
                  // disabled
                />
              </li>
              <li>
                <InputFields
                  label="Student Name *"
                  id="studentName"
                  name="studentName"
                  placeholder="Type Text here"
                  disabled
                  value={formData.studentName}
                />
              </li>

              <li>
                <label>Fee Category *</label>
                <Select
                  value={selectFeeCategory}
                  options={studentCategoryOptions}
                  onChange={(option) => setSelectFeeCategory(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />
                {errors?.selectFeeCategory && (
                  <ErrorBox title={errors?.selectFeeCategory} />
                )}
              </li>

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
                <InputFields
                  label="Late Fee *"
                  disabled={formData.amount ? false : true }
                  id="lateFee"
                  name="lateFee"
                  type="number"
                  placeholder="Type Text here"
                  value={formData.lateFee}
                  onChange={handleChange}
                />
                {errors?.lateFee && <ErrorBox title={errors?.lateFee} />}
              </li>  
              <li>
                <InputFields
                  disabled
                  label="Totel Fee"
                  id="lateFee"
                  name="lateFee"
                  type="number"
                  placeholder="Type Text here"
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

export default FeeSubmission;
