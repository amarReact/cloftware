import styles from "../../../pages/School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../../component/ButtonGlobal";
import Table from "../../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
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

      const editFunction = (row) => {
        console.log("row", row)
        return(
          <div className={styles.editList}>
            <AiFillEye onClick={()=> viewHandler(row?.class_id)} title="View" />
            <BiEdit onClick={()=> editHandler(row?.class_id, row)} title="Edit"  />
            <AiFillDelete className={row?.class_status === "Inactive" && styles.disabled} onClick={()=> deleteHandler(row?.class_id)}  title="Delete"  />
          </div>
        )
      }

      const statusFunction=(row)=>{
        return(
            <button className={styles[row?.class_status]}>{row?.class_status}</button>
        )
      }

      const viewHandler=(val)=>{
        setIsDetail(!isDetail)
        setClassId(val)
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
        Header: ' SR. No.',
        accessor: 'sr_no'
      },

          {
            Header: 'Class Name',
            accessor: 'class_name'
          },
          {
            Header: 'Class section',
            accessor: 'section_details',
            Cell: ({value}) => value.map((v,i)=> <span>{v.section_name} {(i !== value?.length -1 ) && ", "}</span>),
          },
          {
            Header: 'Class Status',
            accessor: statusFunction
          },
      
          {
            Header: 'Action',
            accessor: editFunction
          }   
         
        ],
        []
      )


  const handleSelectionChange = selectedRows => {
    // const selectedData = selectedRows.map((v, i)=> v.teacher_id)
    // setSelectedCheckboxes(selectedData);
};

      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'class_id', label: 'Class ID' },
        { id: 'section_details', label: 'Class section' },
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
             editHandler(row?.class_id)
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
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addClassHandler(YEARID)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Class"><AiOutlinePlusCircle /></ButtonGlobal>
          </aside>
        </section>

        {data2 ? (
        <Table placeholder="Search here..." data={data2} columns={columns} />
        ) : (
          <DataNotFound />
        )}

        {data2 ? (
         <TableMUI data={data2} columns={columnsMi} actions={actions} onSelectionChange={handleSelectionChange} />
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
            <EditClass classId={classId} setIsEdit={setIsEdit} details={details} />
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