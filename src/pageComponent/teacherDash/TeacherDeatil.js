import { useEffect, useState } from "react";
import styles from "../schoolDash/sd.module.css"
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import {BsPlusLg} from "react-icons/bs"
import {CgClose} from "react-icons/cg"
import Cookies from 'js-cookie';

const TeacherDeatil =({techId})=>{
    const token = Cookies.get('jwtToken');
    const [teacherDetailData, setTeacherDetailData] = useState([])
    const [isOpen, setIsOpen] = useState(0)

    const teacherDetailFunc = async () => {
        try {
        const response = await axios.post(`${BASE_URL}/teacher/get_teacher_details`, {
          teacher_id: techId
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
        );
            setTeacherDetailData(response?.data);
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
        teacherDetailFunc()
      },[techId])

    return(
        <div className={styles.sdDiv}>
            {teacherDetailData &&
 <div className={styles.sdDivIn}>
            <aside>
            <h4 onClick={()=> accordianHandler(0)}>{isOpen === 0 ? <CgClose /> : <BsPlusLg />} Teacher Information</h4>
            {isOpen === 0 && <ul>
                 <li><b>Teacher ID</b> <p>{teacherDetailData?.body?.teacher_id}</p></li>
                 <li><b>School ID</b> <p>{teacherDetailData?.body?.scl_id}</p></li>
                 <li><b>First name</b> <p>{teacherDetailData?.body?.first_name}</p></li>
                 <li><b>Middle name</b> <p>{teacherDetailData?.body?.middle_name}</p></li>
                 <li><b>Last name</b> <p>{teacherDetailData?.body?.last_name}</p></li>
                 <li><b>DOB</b> <p>{teacherDetailData?.body?.dob}</p></li>
                 <li><b>Gender</b> <p>{teacherDetailData?.body?.gender}</p></li>
                 <li><b>Email ID</b> <p>{teacherDetailData?.body?.email_id}</p></li>
                 <li><b>Phone number</b> <p>{teacherDetailData?.body?.phone_number}</p></li>
                 <li><b>Social security number</b> <p>{teacherDetailData?.body?.social_security_number}</p></li>
                 <li><b>Emergency contact name</b> <p>{teacherDetailData?.body?.emergency_contact_name}</p></li>
                 <li><b>Emergency contact relationship</b> <p>{teacherDetailData?.body?.emergency_contact_relationship}</p></li>
                 <li><b>Emergency phone number</b> <p>{teacherDetailData?.body?.emergency_phone_number}</p></li>
                 <li><b>Marital status</b> <p>{teacherDetailData?.body?.marital_status}</p></li>
                 <li><b>Spouse name</b> <p>{teacherDetailData?.body?.spouse_name}</p></li>
                 <li><b>Dependents</b> <p>{teacherDetailData?.body?.dependents}</p></li>
                 
             
                 <li><b>Educational qualifications</b> <p>{teacherDetailData?.body?.educational_qualifications}</p></li>
                 <li><b>Teaching certifications</b> <p>{teacherDetailData?.body?.teaching_certifications}</p></li>
                 <li><b>Previous teaching experience</b> <p>{teacherDetailData?.body?.previous_teaching_experience}</p></li>
                 <li><b>Languages spoken</b> <p>{teacherDetailData?.body?.languages_spoken}</p></li>
                 <li><b>Address line1</b> <p>{teacherDetailData?.body?.address_line1}</p></li>
                 <li><b>Address line2</b> <p>{teacherDetailData?.body?.address_line2}</p></li>
                 
                 <li><b>State</b> <p>{teacherDetailData?.body?.state}</p></li>
                 <li><b>City</b> <p>{teacherDetailData?.body?.city}</p></li>

                 <li><b>Pin code</b> <p>{teacherDetailData?.body?.pin_code}</p></li>
                 <li><b>Country</b> <p>{teacherDetailData?.body?.country}</p></li>
                 <li><b>Primary teaching location</b> <p>{teacherDetailData?.body?.primary_teaching_location}</p></li>
                 <li><b>Secondary teaching location</b> <p>{teacherDetailData?.body?.secondary_teaching_location}</p></li>

                 <li><b>Professional development courses</b> <p>{teacherDetailData?.body?.professional_development_courses}</p></li>
                 <li><b>Professional development certificates</b> <p>{teacherDetailData?.body?.professional_development_certificates}</p></li>
                 <li><b>Professional development goals</b> <p>{teacherDetailData?.body?.professional_development_goals}</p></li>
                 <li><b>Skills</b> <p>{teacherDetailData?.body?.skills}</p></li>
                 <li><b>Interests</b> <p>{teacherDetailData?.body?.interests}</p></li>
                 <li><b>Hobbies</b> <p>{teacherDetailData?.body?.hobbies}</p></li>
                 <li><b>Status</b> <p>{teacherDetailData?.body?.status}</p></li>
            </ul>}
            </aside>
            
            <aside>
            <h4 onClick={()=> accordianHandler(1)}>{isOpen === 1 ? <CgClose /> : <BsPlusLg />}Other Details</h4>
            {isOpen === 1 && <ul>
                <li><b>School code</b> <p>{teacherDetailData?.body?.other_details?.school_code}</p></li>
                <li><b>User id</b> <p>{teacherDetailData?.body?.other_details?.user_id}</p></li>
                <li><b>Role id</b> <p>{teacherDetailData?.body?.other_details?.role_id}</p></li>
                <li><b>Email id</b> <p>{teacherDetailData?.body?.other_details?.email_id}</p></li>
                <li><b>Login ID</b> <p>{teacherDetailData?.body?.other_details?.login_id}</p></li>
                
                <li><b>First name</b> <p>{teacherDetailData?.body?.other_details?.first_name}</p></li>
                <li><b>Last name</b> <p>{teacherDetailData?.body?.other_details?.last_name}</p></li>
                <li><b>Registration source</b> <p>{teacherDetailData?.body?.other_details?.registration_source}</p></li>
                <li><b>User status</b> <p>{teacherDetailData?.body?.other_details?.user_status}</p></li>
                <li><b>User type</b> <p>{teacherDetailData?.body?.other_details?.user_type}</p></li>
                <li><b>Created by</b> <p>{teacherDetailData?.body?.other_details?.created_by}</p></li>
            </ul>}
            </aside>

            <aside>
            <h4 onClick={()=> accordianHandler(2)}>{isOpen === 2 ? <CgClose /> : <BsPlusLg />}Teacher other details</h4>
            {isOpen === 2 && <ul>
                <li><b>Teacher details id</b> <p>{teacherDetailData?.body?.teacher_other_details?.teacher_details_id}</p></li>
                <li><b>Teacher id</b> <p>{teacherDetailData?.body?.teacher_other_details?.teacher_id}</p></li>
                <li><b>Emp id</b> <p>{teacherDetailData?.body?.teacher_other_details?.emp_id}</p></li>
                <li><b>Job title</b> <p>{teacherDetailData?.body?.teacher_other_details?.job_title}</p></li>

                <li><b>Date hiring</b> <p>{teacherDetailData?.body?.teacher_other_details?.date_hiring}</p></li>
                <li><b>Employment status</b> <p>{teacherDetailData?.body?.teacher_other_details?.employment_status}</p></li>
                <li><b>Work schedule</b> <p>{teacherDetailData?.body?.teacher_other_details?.work_schedule}</p></li>
                <li><b>Job description</b> <p>{teacherDetailData?.body?.teacher_other_details?.job_description}</p></li>
                <li><b>Performance evaluations</b> <p>{teacherDetailData?.body?.teacher_other_details?.performance_evaluations}</p></li>
                
                <li><b>Disciplinary actions</b> <p>{teacherDetailData?.body?.teacher_other_details?.disciplinary_actions}</p></li>
                <li><b>Reason for termination</b> <p>{teacherDetailData?.body?.teacher_other_details?.reason_for_termination}</p></li>
                <li><b>Salary amount</b> <p>{teacherDetailData?.body?.teacher_other_details?.salary_amount}</p></li>
                <li><b>Pay frequency</b> <p>{teacherDetailData?.body?.teacher_other_details?.pay_frequency}</p></li>
                <li><b>Bank name</b> <p>{teacherDetailData?.body?.teacher_other_details?.bank_name}</p></li>
                <li><b>Account number</b> <p>{teacherDetailData?.body?.teacher_other_details?.account_number}</p></li>
                <li><b>IFSC code</b> <p>{teacherDetailData?.body?.teacher_other_details?.ifcs_code}</p></li>
                <li><b>Routing number</b> <p>{teacherDetailData?.body?.teacher_other_details?.routing_number}</p></li>
                <li><b>Tax information</b> <p>{teacherDetailData?.body?.teacher_other_details?.tax_information}</p></li>
                <li><b>Retirement plan information</b> <p>{teacherDetailData?.body?.teacher_other_details?.retirement_plan_information}</p></li>
                <li><b>Insurance information</b> <p>{teacherDetailData?.body?.teacher_other_details?.insurance_information}</p></li>
                <li><b>Background check results</b> <p>{teacherDetailData?.body?.teacher_other_details?.background_check_results}</p></li>
                <li><b>Drug test results</b> <p>{teacherDetailData?.body?.teacher_other_details?.drug_test_results}</p></li>
                <li><b>Driving record</b> <p>{teacherDetailData?.body?.teacher_other_details?.driving_record}</p></li>
                </ul>}
            </aside>
           
            </div>
            }
            
        </div>
    )
}

export default TeacherDeatil;