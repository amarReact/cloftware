import { useEffect, useState } from "react";
import styles from "../schoolDash/sd.module.css"
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import {BsPlusLg} from "react-icons/bs"
import {CgClose} from "react-icons/cg"
const StudentDeatil =({scId})=>{
    const [studentDetailData, setStudentDetailData] = useState([])
    const [isOpen, setIsOpen] = useState(0)

    const studentDetailFunc = async () => {
        try {
        const response = await axios.post(`${BASE_URL}/student/get_student_details`, {
          student_id: scId
        });
            setStudentDetailData(response?.data);
        } catch (error) {
          console.log(error);
        }
      }

      const accordianHandler=(id)=>{
        if(id === isOpen){
           return setIsOpen(null)
        } 
        setIsOpen(id)
      }

      useEffect(()=>{
        studentDetailFunc()
      },[scId])

    return(
        <div className={styles.sdDiv}>
            {studentDetailData &&
       <div className={styles.sdDivIn}>
             <aside>
            <h4 onClick={()=> accordianHandler(0)}>{isOpen === 0 ? <CgClose /> : <BsPlusLg />} Student Information</h4>
            {isOpen === 0 && <ul>
                 <li><b>Student ID</b> <p>{studentDetailData?.body?.stu_id}</p></li>
                 <li><b>School ID</b> <p>{studentDetailData?.body?.scl_id}</p></li>
                 <li><b>First name</b> <p>{studentDetailData?.body?.stu_first_name}</p></li>
                 <li><b>Last name</b> <p>{studentDetailData?.body?.stu_last_name}</p></li>
                 <li><b>Student DOB</b> <p>{studentDetailData?.body?.stu_dob}</p></li>
                 <li><b>Student gender</b> <p>{studentDetailData?.body?.stu_gender}</p></li>
                 <li><b>Student Current Address</b> <p>{studentDetailData?.body?.stu_current_address}</p></li>
                 <li><b>Student Permanent address</b> <p>{studentDetailData?.body?.stu_permanent_address}</p></li>
                 <li><b>Student Status</b> <p>{studentDetailData?.body?.stu_state}</p></li>
                 <li><b>Student city</b> <p>{studentDetailData?.body?.stu_city}</p></li>
                 <li><b>Student pincode</b> <p>{studentDetailData?.body?.stu_pin_code}</p></li>
                 <li><b>Parent name</b> <p>{studentDetailData?.body?.parent_name}</p></li>
                 <li><b>Relationship to student</b> <p>{studentDetailData?.body?.relationship_to_student}</p></li>
                 <li><b>Phone number</b> <p>{studentDetailData?.body?.phone_number}</p></li>
                 <li><b>Email ID</b> <p>{studentDetailData?.body?.email_id}</p></li>
                 <li><b>Parents Occupations</b> <p>{studentDetailData?.body?.parents_occupations}</p></li>
                 <li><b>Parent Education level</b> <p>{studentDetailData?.body?.parent_education_level}</p></li>
                 <li><b>Parent income</b> <p>{studentDetailData?.body?.parent_income}</p></li>
                 <li><b>Emg contact name</b> <p>{studentDetailData?.body?.emg_contact_name}</p></li>
                 <li><b>Emg contact number</b> <p>{studentDetailData?.body?.emg_contact_number}</p></li>
                 <li><b>Emg email ID</b> <p>{studentDetailData?.body?.emg_email_id}</p></li>
                 <li><b>Emg relationship to student</b> <p>{studentDetailData?.body?.emg_relationship_to_student}</p></li>
                 <li><b>Status</b> <p>{studentDetailData?.body?.status}</p></li>
                 <li><b>Authorized Name</b> <p>{studentDetailData?.body?.authorized_signatory_name}</p></li>
            </ul>}
            </aside>

            <aside>
            <h4 onClick={()=> accordianHandler(1)}>{isOpen === 1 ? <CgClose /> : <BsPlusLg />} Other Details</h4>
            {isOpen === 1 && <ul>
                <li><b>ID </b> <p>{studentDetailData?.body?.other_details?.id}</p></li>
                <li><b>School Code</b> <p>{studentDetailData?.body?.other_details?.school_code}</p></li>
                <li><b>User ID</b> <p>{studentDetailData?.body?.other_details?.user_id}</p></li>
                <li><b>Role ID</b> <p>{studentDetailData?.body?.other_details?.role_id}</p></li>
                <li><b>Login ID</b> <p>{studentDetailData?.body?.other_details?.login_id}</p></li>
                <li><b>Email ID</b> <p>{studentDetailData?.body?.other_details?.email_id}</p></li>
                <li><b>First name</b> <p>{studentDetailData?.body?.other_details?.first_name}</p></li>
                <li><b>Last name</b> <p>{studentDetailData?.body?.other_details?.last_name}</p></li>
                <li><b>Registration source</b> <p>{studentDetailData?.body?.other_details?.registration_source}</p></li>
                <li><b>User status</b> <p>{studentDetailData?.body?.other_details?.user_status}</p></li>
                <li><b>User type</b> <p>{studentDetailData?.body?.other_details?.user_type}</p></li>
                <li><b>Created by</b> <p>{studentDetailData?.body?.other_details?.created_by}</p></li>
            </ul>}
            </aside>

            <aside>
            <h4 onClick={()=> accordianHandler(2)}>{isOpen === 2 ? <CgClose /> : <BsPlusLg />} Role Details</h4>
            {isOpen === 2 && <ul>
                <li><b>ID</b> <p>{studentDetailData?.body?.other_details?.role_details?.id}</p></li>
                <li><b>Role name</b> <p>{studentDetailData?.body?.other_details?.role_details?.role_name}</p></li>
                <li><b>Role Description</b> <p>{studentDetailData?.body?.other_details?.role_details?.role_description}</p></li>
                <li><b>Status</b> <p>{studentDetailData?.body?.other_details?.role_details?.status}</p></li>
                <li><b>created By</b> <p>{studentDetailData?.body?.other_details?.role_details?.created_by}</p></li>
                </ul>}
                </aside>
            </div>
            }
            
        </div>
    )
}

export default StudentDeatil;