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
import ModalGlobal from "../../component/ModalGlobal";
import AddHoliday from "./AddHoliday";
import EditHoliday from "./EditHoliday";
import DeleteHoliday from "./DeleteHoliday";

const HolidayManagement =()=>{
    const [studentId, setStudentId] = useState(null)
    const [addClass, setAddClass] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [deleteClass, setDeleteClass] = useState(false)
    const navigate = useNavigate()
    const tableData = [
        {srno: 1, title: "Republic Day", date: "Jan 26, 2023", description: "Description is the pattern of narrative developm" },
        {srno: 2, title: "Republic Day", date: "Aug 15, 2023", description: "Description is the pattern of narrative developm"  },
    ]

    const addClassHandler=()=>{
        setAddClass(!addClass)
    }

    const data2 = tableData?.map((item, ind) => {
        return { srno: item?.srno, title: item?.title, date: item?.date,  description: item?.description  }
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
            Header: 'SR. no',
            accessor: 'srno'
          },
          {
            Header: 'Title',
            accessor: 'title'
          },
          {
            Header: 'Date',
            accessor: 'date'
          },
          {
            Header: 'Description',
            accessor: 'description'
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
          <h3>Holiday Management</h3>
          <ButtonGlobal onClick={()=> addClassHandler()} size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addClassHandler()} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Holiday"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>
            <Table placeholder="Search here..." data={data2} columns={columns} />
        </div>


        {addClass && 
        <ModalGlobal heading="Add Holiday" outSideClick={false} onClose={setAddClass} activeState={addClass} width="large">
            <AddHoliday />
        </ModalGlobal>}

        {editClass && 
        <ModalGlobal heading="Edit Holiday" outSideClick={false} onClose={setEditClass} activeState={editClass} width="large">
            <EditHoliday />
        </ModalGlobal>}

        {deleteClass && 
        <ModalGlobal heading="Delete Holiday" outSideClick={false} onClose={setDeleteClass} activeState={deleteClass} width="small">
            <DeleteHoliday />
        </ModalGlobal>}

        </Fragment>
    )
}

export default HolidayManagement;