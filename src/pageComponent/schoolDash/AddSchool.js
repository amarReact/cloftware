
import styles from "./addEditSch.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import axios from "axios";
const AddSchool = () =>{
  const navigate = useNavigate();

  const formList = {
    schoolName: '',
    schoolContactNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',

    trustSocietyName: '',
    trustSocietyAddress: '',
    trustSocietyCity: '',
    trustSocietyState: '',
    trustSocietyPincode: '',

    signatoryName: '',
    designation: '',
    contactNo: '',
    emailAddress: '',
    password: '',

    website: '',
    tanNumber: '',
    tanName: '',
    panNumber: '',
    panName: '',
    gstNumber: '',
    studentAccounts: '',
    teacherAccounts: '',
    terminationPeriod: '',

    grade: '',
    dealValue: '',
    paymentReceived: '',
    paymentRemaining: '',
    chequeDDNo: '',
    bankName: '',
    monthlySubscriptionFee: '',
    quarterlyPayment: '',
    principalName: '',
    principalContactNumber: '',
    principaleMailID: '',
  }

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [depositDate, setDepositDate] = useState(new Date());
    const [proposedDate, setProposedDate] = useState(new Date());
    const [billingDate, setBillingDate] = useState(new Date());
    const [poDate, setPoDate] = useState(new Date());

    const [selectBoard, setSelectBoard] = useState("")
    const [selectGrade, setSelectGrade] = useState("")
    const [selectPyment, setSelectPayment] = useState("")
    const [selectPymentStatus, setSelectPymentStatus] = useState("")

    const changeBaordHandler =(val)=>{
        setSelectBoard(val.value)
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
             schoolPostFunc()
        } else {
          setErrors(validationErrors);
        }
      };

      const validate = (formData) => {
        const errors = {};
        if (!formData.schoolName) {
          errors.schoolName = 'School Name is required';
        }
        if (!formData.schoolContactNo) {
          errors.schoolContactNo = 'School Contact No is required';
        }
        if (!formData.address) {
          errors.address = 'Address is required';
        }  
        if (!formData.city) {
          errors.city = 'City is required';
        }
        if (!formData.state) {
          errors.state = 'State is required';
        }
        if (!formData.pincode) {
          errors.pincode = 'Pincode is required';
        }

        if (!formData.trustSocietyName) {
          errors.trustSocietyName = 'Name is required';
        }
        if (!formData.trustSocietyAddress) {
          errors.trustSocietyAddress = 'Address is required';
        }
        if (!formData.trustSocietyCity) {
          errors.trustSocietyCity = 'City is required';
        }
        if (!formData.trustSocietyState) {
          errors.trustSocietyState = 'State is required';
        }
        if (!formData.trustSocietyPincode) {
          errors.trustSocietyPincode = 'Pincode is required';
        }

        if (!formData.signatoryName) {
          errors.signatoryName = 'Signatory Name is required';
        }
        if (!formData.designation) {
          errors.designation = 'Designationis required';
        }
        if (!formData.contactNo) {
          errors.contactNo = 'Contact No required';
        }
        if (!formData.emailAddress) {
          errors.emailAddress = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
          errors.emailAddress = 'Invalid email address';
        }
        if (!formData.password) {
          errors.password = 'Password is required';
        }
        if (!formData.tanNumber) {
          errors.tanNumber = 'TAN Number required';
        }
        if (!formData.tanName) {
          errors.tanName = 'TAN Name required';
        }
        if (!formData.panNumber) {
          errors.panNumber = 'PAN Number required';
        }
        if (!formData.panName) {
          errors.panName = 'PAN Name required';
        }
        if (!formData.gstNumber) {
          errors.gstNumber = 'GST Number required';
        }
        if (!formData.terminationPeriod) {
          errors.terminationPeriod = 'Termination Period required';
        }
        
        if (!formData.principalName) {
          errors.principalName = 'Principal Name required';
        }
        if (!formData.principalContactNumber) {
          errors.principalContactNumber = 'Contact Number required';
        }
        if (!formData.principaleMailID) {
          errors.principaleMailID = 'EMail ID required';
        }

        

        if (!selectBoard) {
          errors.boardDetails = 'Please select an Board Details option.';
        }

        if (!selectGrade) {
          errors.grade = 'Please select an Grade option.';
        }
        
        
        // if (!formData.confirmPassword) {
        //   errors.confirmPassword = 'Confirm password is required';
        // } else if (formData.password !== formData.confirmPassword) {
        //   errors.confirmPassword = 'Passwords do not match';
        // }

        return errors;
      };

      const boardOptions = [
        { value: "CBSE", label: "CBSE" },
        { value: "ICSE", label: "ICSE" },
        { value: "State Board", label: "State Board" },
        { value: "UP-Board", label: "UP-Board" },
        { value: "Others", label: "Others" },
      ];

    const paymentHandler =(val)=>{
      setSelectPayment(val.value)
    } 
      const paymentOptions = [
        { value: "Cash", label: "Cash" },
        { value: "Cheque", label: "Cheque" },
        { value: "DD", label: "DD" },
        { value: "NEFT", label: "NEFT" },
        { value: "RTGS", label: "RTGS" },
      ]

      const paymentStatusHandler =(val)=>{
        setSelectPymentStatus(val.value)
      } 

      const paymentStatusOptions = [
        { value: "Paid", label: "Paid" },
        { value: "Pending", label: "Pending" },
      ]

      const gradeHandler=(val)=>{
        setSelectGrade(val.value)
      }

      const gradeOptions = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
      ]

      const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD");
      };

      const schoolPostFunc = async () => {
        const schoolList = {
          school_name: formData?.schoolName,
          school_phone_number: formData?.schoolContactNo,
          school_address: formData?.address,
          school_city: formData?.city,
          school_state: formData?.state,
          school_pin_code: formData?.pincode,
          
          trust_name: formData?.trustSocietyName,
          trust_address: formData?.trustSocietyAddress,
          trust_city: formData?.trustSocietyCity,
          trust_state: formData?.trustSocietyState,
          trust_pin_code: formData?.trustSocietyPincode,

          authorized_signatory_name: formData?.signatoryName,
          authorized_signatory_designation: formData?.designation,
          authorized_signatory_contact_number: formData?.contactNo,
          authorized_signatory_email_id: formData?.emailAddress,
          password: formData?.password,

          website: formData?.website,
      
          school_tan_number: formData?.tanNumber,
          school_tan_name: formData?.tanName,
          school_pan_number: formData?.panNumber,
          school_pan_name: formData?.panName,
          school_gst_number: formData?.gstNumber,


          num_student: formData?.studentAccounts,
          num_teachers: formData?.teacherAccounts,
          grade: formData?.grade,
          total_deal_value: formData?.dealValue,

          payment_receive: formData?.paymentReceived,
          payment_remaining: formData?.paymentRemaining,
          transaction_number: formData?.chequeDDNo,
          bank_name: formData?.bankName,
          monthly_subscription_fee: formData?.monthlySubscriptionFee,
          quarterly_payment: formData?.quarterlyPayment,

          principal_name: formData?.principalName,
          principal_contact_number: formData?.principalContactNumber,
          principal_email_id: formData?.principaleMailID,


          payment_mode: selectPyment,
          payment_status: selectPymentStatus,
          licence_status: "active",
          curriculum_board: selectBoard,
          school_board: selectBoard,
          grade: selectGrade,
          termination_period: formData?.terminationPeriod,
          licence_number:"8521496ut",
          licence_from: formatDate(startDate),
          licence_to: formatDate(endDate),
          po_date : formatDate(poDate),
          deposit_date : formatDate(depositDate),
          proposed_deployment_date:  formatDate(proposedDate),
          billing_start_date: formatDate(billingDate),
    
        }
    
        axios
          .post("https://aa8b-203-212-233-211.ngrok-free.app/api/add_edit_school", schoolList)
          .then((response) => {
            if(response?.status === 400){
              toast.error(response?.data?.message);
            } else{
              let timer = setTimeout(()=>{
                toast.success(response?.data?.message, {position: "bottom-center"});
                 navigate("/school");
                clearTimeout(timer)
              },3000)
            }
          })
          .catch((error) => {
            console.log(error)
          });
      };

    return(
      <div className={styles.purchaseCntr}>
      <div className={styles.allForm}>
        <section>
        <h3>School Details</h3>
        <ul className={styles.formFields}>

        <li className={styles.threeIn}>
          <InputFields 
            label="School Name *" 
            id="schoolName" 
            name="schoolName" 
            placeholder="Type Text here" 
            value={formData.schoolName}
            onChange={handleChange}  
          />
          {errors?.schoolName && <ErrorBox title={errors?.schoolName} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Contact No *" 
            id="schoolContactNo" 
            name="schoolContactNo" 
            placeholder="Type Text here" 
            value={formData.schoolContactNo}
            onChange={handleChange}  
          />
          {errors?.schoolContactNo && <ErrorBox title={errors?.schoolContactNo} />}
        </li>

        <li className={styles.threeIn }>
          <InputFields 
          label="Address *" 
          id="address"
          name="address"
          placeholder="Type Text here" 
          value={formData.address}
          onChange={handleChange}  
          />
          {errors?.address && <ErrorBox title={errors?.address} />}
        </li>
       
        <li className={styles.threeIn }>
        <InputFields 
          label="City *" 
          id="city"
          name="city"
          value={formData.city}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.city && <ErrorBox title={errors?.city} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="State *" 
          id="state"
          name="state"
          value={formData.state}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {errors?.state && <ErrorBox title={errors?.state} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Pincode *" 
          type="number" 
          id="pincode"
          name="pincode"
          value={formData.pincode}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.pincode && <ErrorBox title={errors?.pincode} />}
        </li>
        </ul>
        </section>

        <section>
        <h3>Trust Details</h3>
        <ul className={styles.formFields}>
        <li className={styles.twoIn}>
          <InputFields 
            label="Trust/Society Name *" 
            id="trustSocietyName" 
            name="trustSocietyName" 
            placeholder="Type Text here" 
            value={formData.trustSocietyName}
            onChange={handleChange}  
          />
          {errors?.trustSocietyName && <ErrorBox title={errors?.trustSocietyName} />}
        </li>

        <li className={styles.twoIn }>
          <InputFields 
          label="Address *" 
          id="trustSocietyAddress"
          name="trustSocietyAddress"
          placeholder="Type Text here" 
          value={formData.trustSocietyAddress}
          onChange={handleChange}  
          />
          {errors?.trustSocietyAddress && <ErrorBox title={errors?.trustSocietyAddress} />}
        </li>
       
        <li className={styles.threeIn }>
        <InputFields 
          label="City *" 
          id="trustSocietyCity"
          name="trustSocietyCity"
          value={formData.trustSocietyCity}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.trustSocietyCity && <ErrorBox title={errors?.trustSocietyCity} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="State *" 
          id="trustSocietyState"
          name="trustSocietyState"
          value={formData.trustSocietyState}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {errors?.trustSocietyState && <ErrorBox title={errors?.trustSocietyState} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Pincode *" 
          type="number" 
          id="trustSocietyPincode"
          name="trustSocietyPincode"
          value={formData.trustSocietyPincode}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.trustSocietyPincode && <ErrorBox title={errors?.trustSocietyPincode} />}
        </li>
        </ul>
        </section>

        <section>
        <h3>Authorized Signatory Details</h3>
        <ul className={styles.formFields}>
        <li className={styles.threeIn }>
        <InputFields 
        label="Authorized Signatory Name *" 
        placeholder="Type Text here" 
        id="signatoryName"
        name="signatoryName"
        value={formData.signatoryName}
        onChange={handleChange}  
        />
           {errors?.signatoryName && <ErrorBox title={errors?.signatoryName} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Designation *" 
          placeholder="Type Text here" 
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}  
        />
          {errors?.designation && <ErrorBox title={errors?.designation} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Contact No. *" 
          type="number" 
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          placeholder="Type Text here" 
          onChange={handleChange} 
        />
         {errors?.contactNo && <ErrorBox title={errors?.contactNo} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="E-Mail Address *" 
          type="email" 
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          placeholder="Type Text here" 
          onChange={handleChange} 
        />
         {errors?.emailAddress && <ErrorBox title={errors?.emailAddress} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Password *" 
          placeholder="Type Text here" 
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}  
        />
          {errors?.password && <ErrorBox title={errors?.password} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Website" 
          placeholder="Type Text here" 
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}  
        />
          {errors?.website && <ErrorBox title={errors?.website} />}
        </li>
       </ul>
       </section>

       <section>
       <h3>Other School Details</h3>
       <ul className={styles.formFields}>
       <li className={styles.threeIn }>
        <label>Board Details *</label>
        <Select options={boardOptions} onChange={changeBaordHandler} className="loginSelectGlb" />
        {errors?.boardDetails && <ErrorBox title={errors?.boardDetails} />}
        </li>

       <li className={styles.threeIn }>
        <InputFields 
         label="TAN Number *" 
         placeholder="Type Text here" 
         id="tanNumber"
         name="tanNumber"
         value={formData.tanNumber}
         onChange={handleChange} 
         />
         {errors?.tanNumber && <ErrorBox title={errors?.tanNumber} />}
        </li>
       
        <li className={styles.threeIn }>
        <InputFields 
          label="TAN Name*" 
          placeholder="Type Text here" 
          id="tanName"
          name="tanName"
          value={formData.tanName}
          onChange={handleChange}  
        />
        {errors?.tanName && <ErrorBox title={errors?.tanName} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="PAN Number *" 
          placeholder="Type Text here" 
          id="panNumber"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}  
        />
          {errors?.panNumber && <ErrorBox title={errors?.panNumber} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="PAN Name *" 
          placeholder="Type Text here" 
          id="panName"
          name="panName"
          value={formData.panName}
          onChange={handleChange} 
        />
          {errors?.panName && <ErrorBox title={errors?.panName} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="GST Number *" 
          placeholder="Type Text here" 
          id="gstNumber"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}  
        />
        {errors?.gstNumber && <ErrorBox title={errors?.gstNumber} />}
        </li>
       </ul>
       </section>

       <section>
       <h3>School Software Details</h3>
       <ul className={styles.formFields}>

       <li className={styles.threeIn}>
        <InputFields 
          label="No. of Student Accounts" 
          type="number" 
          placeholder="Type Text here" 
          id="studentAccounts"
          name="studentAccounts"
          value={formData.studentAccounts}
          onChange={handleChange}  
        />
         {errors?.studentAccounts && <ErrorBox title={errors?.studentAccounts} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="No. of Teacher Accounts" 
          type="number" 
          placeholder="Type Text here" 
          id="teacherAccounts"
          name="teacherAccounts"
          value={formData.teacherAccounts}
          onChange={handleChange}  
         />
          {errors?.teacherAccounts && <ErrorBox title={errors?.teacherAccounts} />}
         </li>

         <li className={styles.threeIn }>
        <InputFields 
          label="Termination Period *" 
          type="number" 
          placeholder="Type Text here" 
          id="terminationPeriod"
          name="terminationPeriod"
          value={formData.terminationPeriod}
          onChange={handleChange}  
         />
          {errors?.terminationPeriod && <ErrorBox title={errors?.terminationPeriod} />}
         </li>

        <li className={styles.threeIn }>
        <label>Grade *</label>
         <Select options={gradeOptions} onChange={gradeHandler} className="loginSelectGlb" />
         {errors?.grade && <ErrorBox title={errors?.grade} />}
        </li>

        <li className={styles.threeIn }>
            <label>License Start Date</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
        </li>

        <li className={styles.threeIn }>
            <label>End Date</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={endDate} onChange={(date) => setEndDate(date)} />
        </li>
       </ul>
       </section>

       <section>
       <h3>Commercial Details</h3>
       <ul className={styles.formFields}>
       <li className={styles.threeIn }>
        <label>Enter PO Date</label>
        <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={poDate} onChange={(date) => setPoDate(date)} />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Total Deal Value" 
          type="number" 
          placeholder="Type Text here" 
          id="dealValue"
          name="dealValue"
          value={formData.dealValue}
          onChange={handleChange} 
        />
          {errors?.dealValue && <ErrorBox title={errors?.dealValue} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Payment Received" 
          type="number" 
          placeholder="Type Text here" 
          id="paymentReceived"
          name="paymentReceived"
          value={formData.paymentReceived}
          onChange={handleChange} 
        />
          {errors?.paymentReceived && <ErrorBox title={errors?.paymentReceived} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Payment Remaining" 
          type="number" 
          placeholder="Type Text here" 
          id="paymentRemaining"
          name="paymentRemaining"
          value={formData.paymentRemaining}
          onChange={handleChange} 
        />
            {errors?.paymentRemaining && <ErrorBox title={errors?.paymentRemaining} />}
        </li>

        <li className={styles.threeIn }>
        <label>Paymont Mode </label>
        <Select options={paymentOptions} onChange={paymentHandler} className="loginSelectGlb" />
        </li>

        <li className={styles.threeIn }>
            <label>Deposit Date</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={depositDate} onChange={(date) => setDepositDate(date)} />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Cheque/DD/Transaction No" 
          placeholder="Type Text here" 
          id="chequeDDNo"
          name="chequeDDNo"
          value={formData.chequeDDNo}
          onChange={handleChange} 
        />
          {errors?.chequeDDNo && <ErrorBox title={errors?.chequeDDNo} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Bank Name" 
          placeholder="Type Text here" 
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange} 
        />
         {errors?.bankName && <ErrorBox title={errors?.bankName} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Monthly Subscription Fee" 
          placeholder="Type Text here" 
          id="monthlySubscriptionFee"
          name="monthlySubscriptionFee"
          value={formData.monthlySubscriptionFee}
          onChange={handleChange} 
        />
         {errors?.monthlySubscriptionFee && <ErrorBox title={errors?.monthlySubscriptionFee} />}
        </li>
        

        <li className={styles.threeIn }>
          <InputFields 
            label="Quarterly Payment" 
            placeholder="Type Text here" 
            id="quarterlyPayment"
            name="quarterlyPayment"
            value={formData.quarterlyPayment}
            onChange={handleChange} 
          />
          {errors?.quarterlyPayment && <ErrorBox title={errors?.quarterlyPayment} />}
        </li>

        <li className={styles.threeIn }>
            <label>Proposed Deployment Date</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={proposedDate} onChange={(date) => setProposedDate(date)} />
        </li>
        <li className={styles.threeIn }>
            <label>Billing Start Date</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={billingDate} onChange={(date) => setBillingDate(date)} />
        </li>

        <li className={styles.threeIn }>
        <label>Payment Status </label>
        <Select options={paymentStatusOptions} onChange={paymentStatusHandler} className="loginSelectGlb" />
        </li>

       </ul>
       </section>

       <section>
       <h3>Additional Details</h3>
       <ul className={styles.formFields}>

        <li className={styles.threeIn }>
        <InputFields 
          label="Principal/Academic Head/Coordinator Name *" 
          placeholder="Type Text here" 
          id="principalName"
          name="principalName"
          value={formData.principalName}
          onChange={handleChange} 
        />
        {errors?.principalName && <ErrorBox title={errors?.principalName} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
        label="Contact Number *" 
        type="number" 
        placeholder="Type Text here" 
        id="principalContactNumber"
        name="principalContactNumber"
        value={formData.principalContactNumber}
        onChange={handleChange} 
        />
          {errors?.principalContactNumber && <ErrorBox title={errors?.principalContactNumber} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="E-Mail ID *" 
          type="email" 
          placeholder="Type Text here" 
          id="principaleMailID"
          name="principaleMailID"
          value={formData.principaleMailID}
          onChange={handleChange} 
        />
        {errors?.principaleMailID && <ErrorBox title={errors?.principaleMailID} />}
        </li>
       </ul>
       <ButtonGlobal className={styles.nxtBtn} bgColor="green" onClick={handleSubmit} width="auto" title="Continue" />
       <ToastContainer />
       </section>
       </div>
    </div>
       
    )
}

export default AddSchool;