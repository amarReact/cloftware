import { useEffect, useState } from "react";
import styles from "./sd.module.css"
import axios from "axios";

const SchoolDeatil =({scId})=>{
    const [schoolDetailData, setSchoolDetailData] = useState([])


    const schoolDetailFunc = async () => {
        try {
        const response = await axios.post(`https://aa8b-203-212-233-211.ngrok-free.app/api/get_school_details`, {
          school_id: scId
        });
        console.log("response3", response?.data)
            setSchoolDetailData(response?.data);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        schoolDetailFunc()
      },[scId])

    return(
        <div className={styles.sdDiv}>
            {schoolDetailData &&
            <>
             <ul>
                 <li><b>School Name</b> <p>{schoolDetailData?.body?.school_name}</p></li>
                 <li><b>School Address</b> <p>{schoolDetailData?.body?.school_address}</p></li>
                 <li><b>School City</b> <p>{schoolDetailData?.body?.school_city}</p></li>
                 <li><b>School Code</b> <p>{schoolDetailData?.body?.school_code}</p></li>
                 <li><b>School Contact No.</b> <p>{schoolDetailData?.body?.school_phone_number}</p></li>
                 <li><b>School Pincode</b> <p>{schoolDetailData?.body?.school_pin_code}</p></li>
                 <li><b>School State</b> <p>{schoolDetailData?.body?.school_state}</p></li>
                 <li><b>School Status</b> <p>{schoolDetailData?.body?.school_status}</p></li>
                 <li><b>SCL ID</b> <p>{schoolDetailData?.body?.scl_id}</p></li>
                 <li><b>Trust Address</b> <p>{schoolDetailData?.body?.trust_address}</p></li>
                 <li><b>Trust City</b> <p>{schoolDetailData?.body?.trust_city}</p></li>
                 <li><b>Trust Name</b> <p>{schoolDetailData?.body?.trust_name}</p></li>
                 <li><b>Trust Pincode</b> <p>{schoolDetailData?.body?.trust_pin_code}</p></li>
                 <li><b>Trust State</b> <p>{schoolDetailData?.body?.trust_state}</p></li>
                 <li><b>Website</b> <p>{schoolDetailData?.body?.website}</p></li>
                 <li><b>Board</b> <p>{schoolDetailData?.body?.curriculum_board}</p></li>
                 <li><b>Principal Contact No.</b> <p>{schoolDetailData?.body?.principal_contact_number}</p></li>
                 <li><b>Principal Email</b> <p>{schoolDetailData?.body?.principal_email_id}</p></li>
                 <li><b>Principal Name</b> <p>{schoolDetailData?.body?.principal_name}</p></li>
                 <li><b>Authorized Contact No.</b> <p>{schoolDetailData?.body?.authorized_signatory_contact_number}</p></li>
                 <li><b>Authorized Designation</b> <p>{schoolDetailData?.body?.authorized_signatory_designation}</p></li>
                 <li><b>Authorized Email</b> <p>{schoolDetailData?.body?.authorized_signatory_email_id}</p></li>
                 <li><b>Authorized Name</b> <p>{schoolDetailData?.body?.authorized_signatory_name}</p></li>
            </ul>
            <h4>Other Details</h4>
            <ul>
                <li><b>SCL ID </b> <p>{schoolDetailData?.body?.other_details?.scl_details_id}</p></li>
                <li><b>School ID </b> <p>{schoolDetailData?.body?.other_details?.school_id}</p></li>
                <li><b>School PAN Number</b> <p>{schoolDetailData?.body?.other_details?.school_pan_number}</p></li>
                <li><b>School PAN Name</b> <p>{schoolDetailData?.body?.other_details?.school_pan_name}</p></li>
                <li><b>School TAN Number</b> <p>{schoolDetailData?.body?.other_details?.school_tan_number}</p></li>
                <li><b>School TAN Name</b> <p>{schoolDetailData?.body?.other_details?.school_tan_name}</p></li>
                <li><b>School GST Number</b> <p>{schoolDetailData?.body?.other_details?.school_gst_number}</p></li>
                <li><b>School GST Number</b> <p>{schoolDetailData?.body?.other_details?.school_gst_number}</p></li>
            </ul>

            <h4>Commercial Details</h4>
            <ul>
                <li><b>Bank Name</b> <p>{schoolDetailData?.body?.commercial_details?.scl_details_id}</p></li>
                <li><b>Bank Name</b> <p>{schoolDetailData?.body?.commercial_details?.bank_name}</p></li>
                <li><b>Billing Start Date</b> <p>{schoolDetailData?.body?.commercial_details?.billing_start_date}</p></li>
                <li><b>Created</b> <p>{schoolDetailData?.body?.commercial_details?.created_at}</p></li>
                <li><b>created By</b> <p>{schoolDetailData?.body?.commercial_details?.created_by}</p></li>
                <li><b>Deposit Date</b> <p>{schoolDetailData?.body?.commercial_details?.deposit_date}</p></li>
                <li><b>Monthly Subscription Fee</b> <p>{schoolDetailData?.body?.commercial_details?.monthly_subscription_fee}</p></li>
                <li><b>Payment Mode</b> <p>{schoolDetailData?.body?.commercial_details?.payment_mode}</p></li>
                <li><b>Payment Receive</b> <p>{schoolDetailData?.body?.commercial_details?.payment_receive}</p></li>
                <li><b>Payment Remaining</b> <p>{schoolDetailData?.body?.commercial_details?.payment_remaining}</p></li>
                <li><b>Payment Status</b> <p>{schoolDetailData?.body?.commercial_details?.payment_status}</p></li>
                <li><b>Po Date</b> <p>{schoolDetailData?.body?.commercial_details?.po_date}</p></li>
                <li><b>Proposed Deployment Date</b> <p>{schoolDetailData?.body?.commercial_details?.proposed_deployment_date}</p></li>
                <li><b>Quarterly Payment</b> <p>{schoolDetailData?.body?.commercial_details?.quarterly_payment}</p></li>
                <li><b>School ID</b> <p>{schoolDetailData?.body?.commercial_details?.school_id}</p></li>
                <li><b>SCL Commercial Details Id</b> <p>{schoolDetailData?.body?.commercial_details?.scl_commercial_details_id}</p></li>
                <li><b>Total Deal Value</b> <p>{schoolDetailData?.body?.commercial_details?.total_deal_value}</p></li>
                <li><b>Transaction Number</b> <p>{schoolDetailData?.body?.commercial_details?.transaction_number}</p></li>
                <li><b>Updated At</b> <p>{schoolDetailData?.body?.commercial_details?.updated_at ? schoolDetailData?.body?.commercial_details?.updated_at : "NA"}</p></li>
                <li><b>Updated By</b> <p>{schoolDetailData?.body?.commercial_details?.updated_by ? schoolDetailData?.body?.commercial_details?.updated_by : "NA"}</p></li>
                <li><b>Updated By</b> <p>{schoolDetailData?.body?.commercial_details?.updated_by ? schoolDetailData?.body?.commercial_details?.updated_by : "NA"}</p></li>
            </ul>

            <h4>Platform Licence Detail</h4>
            <ul>
                <li><b>SCL ID </b> <p>{schoolDetailData?.body?.platform_licence_detail?.scl_platform_lic_id}</p></li>
                <li><b>Licence Number </b> <p>{schoolDetailData?.body?.platform_licence_detail?.licence_number}</p></li>
                <li><b>Licence To</b> <p>{schoolDetailData?.body?.platform_licence_detail?.licence_to}</p></li>
                <li><b>Number of Student</b> <p>{schoolDetailData?.body?.platform_licence_detail?.num_student}</p></li>
                <li><b>Number Teachers</b> <p>{schoolDetailData?.body?.platform_licence_detail?.num_teachers}</p></li>
                <li><b>Grade</b> <p>{schoolDetailData?.body?.platform_licence_detail?.grade}</p></li>
                <li><b>Termination Period</b> <p>{schoolDetailData?.body?.platform_licence_detail?.termination_period}</p></li>
                <li><b>Licence Status</b> <p>{schoolDetailData?.body?.platform_licence_detail?.licence_status}</p></li>
                <li><b>Licence Status</b> <p>{schoolDetailData?.body?.platform_licence_detail?.licence_status}</p></li>
            </ul>
            </>
            }
            
        </div>
    )
}

export default SchoolDeatil;