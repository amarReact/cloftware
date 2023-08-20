import { useEffect, useState } from "react";
import styles from "../../pageComponent/schoolDash/sd.module.css";
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import { BsPlusLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import Cookies from "js-cookie";

const AdmissionEnquiryDeatil = ({ aeID }) => {
  const token = Cookies.get("jwtToken");
  const [admissionDetailData, setAdmissionDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(0);

  console.log("aeID", aeID)

  const admissionDetailFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/enquiry/admission_enquiry_details`,
        {
          admission_enq_id: aeID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmissionDetailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const accordianHandler = (id) => {
    if (id === isOpen) {
      return setIsOpen(null);
    }
    setIsOpen(id);
  };

  useEffect(() => {
    admissionDetailFunc();
  }, [aeID]);

  return (
    <div className={styles.sdDiv}>
      {admissionDetailData && (
        <div className={styles.sdDivIn}>
          <aside>
           
            {isOpen === 0 && (
              <>
                <ul>
                  <li>
                    <b>Admission Enq ID</b> <p>{admissionDetailData?.body?.admission_enq_id}</p>
                  </li>
                  <li>
                    <b>Year ID</b> <p>{admissionDetailData?.body?.year_id}</p>
                  </li>
                  <li>
                    <b>School ID</b> <p>{admissionDetailData?.body?.school_id}</p>
                  </li>
                  <li>
                    <b>Class ID</b> <p>{admissionDetailData?.body?.class_id}</p>
                  </li>
                  <li>
                    <b>Student name</b> <p>{admissionDetailData?.body?.student_name}</p>
                  </li>
                  <li>
                    <b>Student Phone</b> <p>{admissionDetailData?.body?.student_phone}</p>
                  </li>
                  <li>
                    <b>Student Alternate Phone</b> <p>{admissionDetailData?.body?.student_alternate_phone}</p>
                  </li>
                  <li>
                    <b>Father Name</b> <p>{admissionDetailData?.body?.father_name}</p>
                  </li>
                  <li>
                    <b>Mother Name</b> <p>{admissionDetailData?.body?.mother_name}</p>
                  </li>
                  <li>
                    <b>Gender</b> <p>{admissionDetailData?.body?.gender}</p>
                  </li>
                  <li>
                    <b>Dob</b> <p>{admissionDetailData?.body?.dob}</p>
                  </li>
                  <li>
                    <b>Address</b> <p>{admissionDetailData?.body?.address}</p>
                  </li>
                  <li>
                    <b>Country</b> <p>{admissionDetailData?.body?.country}</p>
                  </li>
                  <li>
                    <b>State</b> <p>{admissionDetailData?.body?.state}</p>
                  </li>
                  <li>
                    <b>City</b> <p>{admissionDetailData?.body?.city}</p>
                  </li>
                  <li>
                    <b>Status</b> <p>{admissionDetailData?.body?.status}</p>
                  </li>
                </ul>
               
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default AdmissionEnquiryDeatil;
