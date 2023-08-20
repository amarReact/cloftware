
import styles from "../School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
import ModalGlobal from "../../component/ModalGlobal";
import AddVisitor from "./AddVisitor";
import EditVisitor from "./EditVisitor";
import DeleteVisitor from "./DeleteVisitor";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import VisitorDeatil from "./VisitorDeatil";
import { useAuthData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";

const VisitorList =()=>{
    const token = Cookies.get('jwtToken');
    const {authList} = useAuthData()
    const [admissionData, setAdmissionData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [studentId, setStudentId] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [classId, setClassId] = useState(null)
    const [editClass, setEditClass] = useState(false)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100);
    const [yearId, setYearId] = useState(null)
    const [details, setDetails ] = useState({})
    const [aeID, setAeID] = useState("")
    const [selectedRows, setSelectedRows] = useState([]);


    let YEARID = authList?.year_id

    console.log("authList", authList?.year_id)

    const classManageListFunc = async ()=>{
   
          try {
            const response = await axios.post(
              `${BASE_URL}/enquiry/get_enquiry_list`,
              {
                offset,
                limit,
                school_id: authList?.school_id,
                year_id: YEARID,
                class_id: 7,
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
        return {  sr_no: ind+1,  student_name: item?.student_name, father_name: item?.father_name, mother_name: item?.mother_name, student_phone: item?.student_phone, gender: item?.gender, dob: item?.dob, address: item?.address, state: item?.state, city: item?.city, status: item?.status, admission_enq_id: item?.admission_enq_id }
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
    
      const editHandler=(cid,obj)=>{
        setIsEdit(!isEdit)
        setClassId(cid)
        setDetails(obj)
      }
    
      const deleteHandler=(val)=>{
        setIsDelete(!isDelete)
        setClassId(val)
      }

  
    
      const columns = useMemo(
        () => [
          {
            Header: (
              <div>
                <input type="checkbox" />
              </div>
            ),
            id: 'selection',
            Cell: ({ row }) => (
              <div>
                <input type="checkbox" {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
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

          
          // {
          //   Header: 'Class section',
          //   accessor: 'section_details',
          //   Cell: ({value}) => value.map((v,i)=> <span>{v.section_name} {(i !== value?.length -1 ) && ", "}</span>),
          // },

          // {
          //   Header: 'Class Status',
          //   accessor: statusFunction
          // },
      
          {
            Header: 'Action',
            accessor: editFunction
          }   
         
        ],
        []
      )

      useEffect(()=>{
        classManageListFunc()
      }, [offset, limit, isAdd, isEdit, isDelete, authList])

      const handleSelectedRows = (rowIds, rows) => {
        setSelectedRows(rows);
      };

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Visitor Enquiry</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addAdmissionHandler(YEARID)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Visitor"><AiOutlinePlusCircle /></ButtonGlobal>
          </aside>
        </section>

           
            {data2 ? (
        <Table placeholder="Search here..."
        data={data2}
        columns={columns}
        handleSelectedRows={handleSelectedRows} />
      ) : (
        <DataNotFound />
      )}

        </div>


        {isAdd && 
        <ModalGlobal heading="Add Visitor" outSideClick={false} onClose={setIsAdd} activeState={isAdd} width="extraLarge">
            <AddVisitor setIsAdd={setIsAdd} yearId={yearId} />
        </ModalGlobal>}

        {isEdit && 
        <ModalGlobal heading="Edit Visitor" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditVisitor classId={classId} setIsEdit={setIsEdit} details={details} />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Visitor Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <VisitorDeatil aeID={aeID}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Visitor Status" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <DeleteVisitor aeID={aeID} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

        </Fragment>
    )
}

export default VisitorList;