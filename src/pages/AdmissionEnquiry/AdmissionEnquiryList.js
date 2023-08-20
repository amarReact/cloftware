
import styles from "../School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
import ModalGlobal from "../../component/ModalGlobal";
import AddAdmissionEnquiry from "./AddAdmissionEnquiry";
import EditAdmissionEnquiry from "./EditAdmissionEnquiry";
import DeleteAdmissionEnquiry from "./DeleteAdmissionEnquiry";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import AdmissionEnquiryDeatil from "./AdmissionEnquiryDeatil";
import { useAuthData, useUserDetailData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const AdmissionEnquiryList =()=>{
    const token = Cookies.get('jwtToken');
    const  {userDataGlobal} = useUserDetailData()
    const {authList} = useAuthData()
    const [admissionData, setAdmissionData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100);
    const [yearId, setYearId] = useState(null)
    const [details, setDetails ] = useState({})
    const [aeID, setAeID] = useState("")

    let YEARID = userDataGlobal?.body?.year_id

    const classManageListFunc = async ()=>{
   
          try {
            const response = await axios.post(
              `${BASE_URL}/enquiry/get_enquiry_list`,
              {
                offset,
                limit,
                school_id: authList?.school_id,
                year_id: YEARID,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              }
            )
            setAdmissionData(response?.data)
        }
       catch (error){
        console.log(error);
       }
    }

    const addAdmissionHandler=(id)=>{
        setIsAdd(!isAdd)
        setYearId(id)
    }

    const data2 = admissionData?.body?.map((item, ind) => {
        return {  sr_no: ind+1,  student_name: item?.student_name, father_name: item?.father_name, mother_name: item?.mother_name, student_phone: item?.student_phone, gender: item?.gender, dob: item?.dob, address: item?.address, state: item?.state, city: item?.city, status: item?.status, admission_enq_id: item?.admission_enq_id,  class_id: item?.class_id,  country: item?.country,  student_alternate_phone: item?.student_alternate_phone }
      });


      const editFunction = (row) => {
   
        return(
          <div className={styles.editList}>
            <AiFillEye onClick={()=> viewHandler(row?.admission_enq_id)} title="View" />
            <BiEdit onClick={()=> editHandler(row?.admission_enq_id, row)} title="Edit"  />
            <AiFillDelete className={row?.status === "Inactive" && styles.disabled} onClick={()=> deleteHandler(row?.admission_enq_id)}  title="Delete"  />
          </div>
        )
      }

      const statusFunction=(row)=>{
        return(
            <button className={styles[row?.status]}>{row?.status}</button>
        )
      }

      const viewHandler=(val)=>{
        setIsDetail(!isDetail)
        setAeID(val)
      }
    
      const editHandler=(aid,obj)=>{
        setIsEdit(!isEdit)
        setAeID(aid)
        setDetails(obj)
      }
    
      const deleteHandler=(val)=>{
        setIsDelete(!isDelete)
        setAeID(val)
      }

  
    
      const columns = useMemo(
        () => [
         {
        Header: ' SR. No.',
        accessor: 'sr_no'
      },

          {
            Header: 'Student Name',
            accessor: 'student_name'
          },
          {
            Header: 'Father Name',
            accessor: 'father_name'
          },
          {
            Header: 'Mother Name',
            accessor: 'mother_name'
          },
          {
            Header: 'Student Phone',
            accessor: 'student_phone'
          },

          {
            Header: 'Address',
            accessor: 'address'
          },

          {
            Header: 'Status',
            accessor: statusFunction
          },
      
          {
            Header: 'Action',
            accessor: editFunction
          }   
         
        ],
        []
      )

      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'student_name', label: 'Student Name' },
        { id: 'admission_enq_id', label: 'Admission enq ID', hide: true },
        { id: 'father_name', label: 'Father Name'},
        { id: 'mother_name', label: 'Mother Name'},
        { id: 'student_phone', label: 'Student Phone'},
        { id: 'address', label: 'Address'},
        { id: 'status', label: 'Status' },
      ];

      const actions = [
        {
          label: <AiFillEye title="View" />,
          onClick: row => {
            viewHandler(row?.admission_enq_id)
          },
        },
        {
          label: <BiEdit title="Edit"  />,
          onClick: row => {
             editHandler(row?.admission_enq_id, row)
          },
        },
        {
          label: <AiFillDelete title="Delete"  />,
          onClick: row => {
            deleteHandler(row?.admission_enq_id, row?.status)
          },
        },
      ];

      useEffect(()=>{
        classManageListFunc()
      }, [offset, limit, isAdd, isEdit, isDelete, YEARID])

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Admission Enquiry</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addAdmissionHandler(YEARID)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus  className={styles.abPlus} /></ButtonGlobal>
          </aside>
        </section>

            {/* {data2 ? (
        <Table placeholder="Search here..." data={data2} columns={columns} />
        ) : (
          <DataNotFound />
        )} */}

        {data2 ? (
        <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}
        </div>


        {isAdd && 
        <ModalGlobal heading="Add Admission Enquiry" outSideClick={false} onClose={setIsAdd} activeState={isAdd} width="extraLarge">
            <AddAdmissionEnquiry setIsAdd={setIsAdd} yearId={YEARID} />
        </ModalGlobal>}

        {isEdit && 
        <ModalGlobal heading="Edit Admission Enquiry" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditAdmissionEnquiry aeID={aeID} yearId={YEARID} setIsEdit={setIsEdit} details={details} />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Admission Enquiry Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <AdmissionEnquiryDeatil aeID={aeID}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Admission Enquiry Status" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <DeleteAdmissionEnquiry aeID={aeID} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

        </Fragment>
    )
}

export default AdmissionEnquiryList;