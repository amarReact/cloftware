import styles from "../../pages/School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
import {BiExport, BiImport} from "react-icons/bi"
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import EditAcademicYear from "./EditAcademicYear";
import ModalGlobal from "../../component/ModalGlobal";
import { useAuthData, useUserDetailData } from "../../utlis";
import AcademicYearManagement from "./AcademicYearManagement";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"


const AcademicYearList =()=>{
    const token = Cookies.get('jwtToken');
    const  {userDataGlobal} = useUserDetailData()
    const {authList} = useAuthData()
    const [studentId, setStudentId] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [deleteClass, setDeleteClass] = useState(false)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [newsAcademicData, setAcademicData] = useState([]);
    const [details, setDetails] = useState({})
    const navigate = useNavigate()

    console.log("userDataGlobal", userDataGlobal)

    let YEARID =  userDataGlobal?.body?.year_id
    
    const academicYearListFunc = async ()=>{
      try {
        const response = await axios.post(
          `${BASE_URL}/year/get_year_listing`,
          {
            offset,
            limit,
            year_id: YEARID
          },
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        )
    
        setAcademicData(response?.data)
    }
   catch (error){
    console.log(error);
   }
}

    const data2 = newsAcademicData?.body?.map((item, ind) => {
        return {sr_no: ind+1, school_id: item?.school_id, title: item?.title, start_date: item?.start_date, end_date: item?.end_date, current_year: item?.current_year }
      });
    
      const editFunction = (row) => {
        return(
          <div className={styles.editList}>
            <BiEdit onClick={()=> editHandler(row?.current_year, row)} title="Edit"  />
            {/* <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.school_id)}  title="Delete"  /> */}
          </div>
        )
      }

      const currentYearFunction=(data)=>{
        const getYears =  <span style={{color: data == "1" ? "#44AF69" : "red"}}>{data == "1" ? "Yes" : "No"}</span>
        return getYears;
      }
    
      const editHandler=(obj)=>{
        setEditClass(!editClass)
        setDetails(obj)
      }
    
      const addAcademicHandler=()=>{
        setIsAdd(!isAdd)
      }
  
      const deleteHandler=(val)=>{
        setDeleteClass(!deleteClass)
        setStudentId(val)
      }
    
      const columns = useMemo(
        () => [
          {
            Header: ' SR. No.',
            accessor: 'sr_no'
          },
          {
            Header: 'Title',
            accessor: 'title'
          },
          {
            Header: 'Start Date',
            accessor: 'start_date'
          },
          {
            Header: 'End Date',
            accessor: 'end_date'
          },
          {
            Header: 'Current Year',
            accessor: 'current_year',
            // Cell: currentYearFunction
            // accessor: currentYearFunction
          },

          {
            Header: 'Action',
            accessor: editFunction
          }
         
        ],
        []
      );

      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'title', label: 'Title' },
        { id: 'school_id', label: 'School ID', hide: true },
        { id: 'start_date', label: 'Start Date' },
        { id: 'end_date', label: 'End Date' },
        { id: 'current_year', label: 'Current Year', format : currentYearFunction },
      ];
    
      const actions = [
        
        {
          label: <BiEdit title="Edit"  />,
          onClick: row => {
             editHandler(row)
          },
        },
      ];

      useEffect(()=>{
        academicYearListFunc()
      }, [offset, limit, editClass, YEARID])

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Academic Year List</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Add"
            onClick={()=> addAcademicHandler()}
          >
       <FaPlus  className={styles.abPlus} />
          </ButtonGlobal>
          </aside>
        </section>

            
        {data2 ? (
          <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}

        </div>


        {isAdd && 
        <ModalGlobal heading="Add Academic Year" outSideClick={false} onClose={setIsAdd} activeState={isAdd} width="extraLarge">
            <AcademicYearManagement />
        </ModalGlobal>}

        {editClass && 
        <ModalGlobal heading="Edit Academic Year" outSideClick={false} onClose={setEditClass} activeState={editClass} width="large">
            <EditAcademicYear details={details} setEditClass={setEditClass} />
        </ModalGlobal>}

        

      {/* 
        {editClass && 
        <ModalGlobal heading="Edit Class" outSideClick={false} onClose={setEditClass} activeState={editClass} width="large">
            <EditClass />
        </ModalGlobal>}

        {deleteClass && 
        <ModalGlobal heading="Delete Class" outSideClick={false} onClose={setDeleteClass} activeState={deleteClass} width="small">
            <DeleteClass />
        </ModalGlobal>} */}

        </Fragment>
    )
}

export default AcademicYearList;