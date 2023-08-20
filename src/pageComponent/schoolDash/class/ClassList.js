import styles from "../../../pages/School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../../component/ButtonGlobal";
import Table from "../../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import ModalGlobal from "../../../component/ModalGlobal";
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import DeleteClass from "./DeleteClass";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../../redux/constants/constants";
import ClassDeatil from "./ClassDeatil";
import { useAuthData, useUserDetailData } from "../../../utlis";
import { DataNotFound } from "../../../component/DataNotFound";
import TableMUI from "../../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const ClassManagement =()=>{
    const token = Cookies.get('jwtToken');
    const {userDataGlobal} = useUserDetailData();
    const [classData, setClassData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [addClass, setAddClass] = useState(false)
    const [classId, setClassId] = useState(null)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100);
    const [yearId, setYearId] = useState(null)
    const [details, setDetails ] = useState({})

    let YEARID = userDataGlobal?.body?.year_id

    const classManageListFunc = async ()=>{
   
          try {
            const response = await axios.post(
              `${BASE_URL}/class/get_class_list`,
              {
                offset,
                limit,
                year_id: YEARID,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              }
            )
            setClassData(response?.data)
        }
       catch (error){
        console.log(error);
       }
    }

    const addClassHandler=(id)=>{
        setAddClass(!addClass)
        setYearId(id)
    }

    const data2 = classData?.body?.map((item, ind) => {
        return {  sr_no: ind+1,  class_id: item?.class_id, class_name: item?.class_name, class_status: item?.class_status, section_details: item?.section_details,  class_status: item?.class_status, year_id: item?.year_id }
      });

      const viewHandler=(val)=>{
        setIsDetail(!isDetail)
        setClassId(val)
      }
    
      const editHandler=(obj)=>{
        setIsEdit(!isEdit)
        setDetails(obj)
      }
    
      const deleteHandler=(val)=>{
        setIsDelete(!isDelete)
        setClassId(val)
      }
  
      const sectionDetails = (data) => {
        const getData = data.map((v, i) => v.section_name);
        const result = getData.join(', ');
        return result;
      };


      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'class_name', label: 'Class Name' },
        { id: 'class_id', label: 'Class ID', hide: true },
        { id: 'section_details', label: 'Class section', format: sectionDetails },
        { id: 'class_status', label: 'Class Status' },
      ];
    
      const actions = [
        {
          label: <AiFillEye title="View" />,
          onClick: row => {
            viewHandler(row?.class_id)
          },
        },
        {
          label: <BiEdit title="Edit"  />,
          onClick: row => {
             editHandler(row)
          },
        },
        {
          label: <AiFillDelete title="Delete"  />,
          onClick: row => {
            deleteHandler(row?.class_id, row?.class_status)
          },
        },
      ];

      useEffect(()=>{
        classManageListFunc()
      }, [offset, limit, addClass, isEdit, isDelete, YEARID])


    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Class Management</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addClassHandler(YEARID)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus className={styles.abPlus} /></ButtonGlobal>

          </aside>
        </section>

        {data2 ? (
         <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}
       
        </div>

        {addClass && 
        <ModalGlobal heading="Add Class" outSideClick={false} onClose={setAddClass} activeState={addClass} width="large">
            <AddClass setAddClass={setAddClass} yearId={yearId} />
        </ModalGlobal>}

        {isEdit && 
        <ModalGlobal heading="Edit Class" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="large">
            <EditClass setIsEdit={setIsEdit} details={details} />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Class Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <ClassDeatil classId={classId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Class Status" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <DeleteClass classId={classId} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

        </Fragment>
    )
}

export default ClassManagement;