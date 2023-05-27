import styles from "../../pages/School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
// import ModalGlobal from "../../component/ModalGlobal";
// import AddClass from "./AddClass";
// import EditClass from "./EditClass";
// import DeleteClass from "./DeleteClass";
const FeePlan =()=>{
    const [studentId, setStudentId] = useState(null)
    const [addClass, setAddClass] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [deleteClass, setDeleteClass] = useState(false)
    const navigate = useNavigate()
    const tableData = [
        {stu_id: 1, classname: "Panther", section: "A,B,C,D" },
        {stu_id: 2, classname: "Lion", section: "A,B,C,D" },
    ]

    const addClassHandler=()=>{
        setAddClass(!addClass)
    }

    const data2 = tableData?.map((item, ind) => {
        return { stu_id: item?.stu_id, classname: item?.classname, section: item?.section, staff: item?.staff }
      });
    
      const editFunction = (row) => {
        return(
          <div className={styles.editList}>
            <BiEdit onClick={()=> editHandler(row?.stu_id)} title="Edit"  />
          </div>
        )
      }
    
    //   const statusFunction=(row)=>{
    //     return(
    //         <button className={styles[row?.status]}>{row?.status}</button>
    //     )
    //   }
    
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
            Header: 'Fee Type',
            accessor: 'stu_id'
          },
          {
            Header: 'EWS',
            accessor: 'classname'
          },
          {
            Header: 'RTR',
            accessor: 'section'
          },
          {
            Header: 'Staff',
            accessor: 'staff'
          },
          
        //   {
        //     Header: 'status',
        //     accessor: statusFunction
        //   },
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
          <h3>Fee Plan</h3>
          
          <ButtonGlobal size="small" bgColor="border" width="auto" title="Academic Year">2022-2023</ButtonGlobal>

          <ButtonGlobal size="small" className={styles.addSchool} bgColor="green" width="auto" title="PDF"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>

            <Table placeholder="Search here..." data={data2} columns={columns} />
        </div>

{/* 
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
        </ModalGlobal>} */}

        </Fragment>
    )
}

export default FeePlan;