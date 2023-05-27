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
const ClassManagement =()=>{
    const [studentId, setStudentId] = useState(null)
    const [addClass, setAddClass] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [deleteClass, setDeleteClass] = useState(false)
    const navigate = useNavigate()
    const tableData = [
        {stu_id: 1, classname: "Panther", section: ["A","B","C","D"] },
        {stu_id: 2, classname: "Lion", section: ["A","B","C","D"] },
    ]

    const addClassHandler=()=>{
        setAddClass(!addClass)
    }

    const data2 = tableData?.map((item, ind) => {
        return { stu_id: item?.stu_id, classname: item?.classname, section: item?.section }
      });
    
      const editFunction = (row) => {
        return(
          <div className={styles.editList}>
            {/* <AiFillEye onClick={()=> viewHandler(row?.stu_id)} title="View" /> */}
            <BiEdit onClick={()=> editHandler(row?.stu_id)} title="Edit"  />
            <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.stu_id)}  title="Delete"  />
          </div>
        )
      }


    
      const editHandler=(val)=>{
        setEditClass(!editClass)
        setStudentId(val)
      }
    
      
    
      const deleteHandler=(val)=>{
        setDeleteClass(!deleteClass)
        setStudentId(val)
      }
    
      const columns = useMemo(
        () => [
          {
            Header: 'Stu. ID',
            accessor: 'stu_id'
          },
          {
            Header: 'Class Name',
            accessor: 'classname'
          },
          {
            Header: 'Class section',
            accessor: 'section',
            Cell: ({value}) => value.map((v,i)=> <ButtonGlobal className={styles.btnBord} key={v} title="" width="auto" size="small" bgColor="border">{v}</ButtonGlobal>),
          },
      
          {
            Header: 'Action',
            accessor: editFunction
          }
         
        ],
        []
      )

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Class Management</h3>
          <ButtonGlobal onClick={()=> addClassHandler()} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Class"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>

            <Table placeholder="Search here..." data={data2} columns={columns} />
        </div>


        {addClass && 
        <ModalGlobal heading="Add Class" outSideClick={false} onClose={setAddClass} activeState={addClass} width="large">
            <AddClass />
        </ModalGlobal>}

        {editClass && 
        <ModalGlobal heading="Edit Class" outSideClick={false} onClose={setEditClass} activeState={editClass} width="large">
            <EditClass />
        </ModalGlobal>}

        {deleteClass && 
        <ModalGlobal heading="Delete Class" outSideClick={false} onClose={setDeleteClass} activeState={deleteClass} width="small">
            <DeleteClass />
        </ModalGlobal>}

        </Fragment>
    )
}

export default ClassManagement;