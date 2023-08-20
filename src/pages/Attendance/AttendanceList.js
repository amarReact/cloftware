import styles from "../../pages/School/sList.module.css";
import { ToastContainer, toast } from 'react-toastify';
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import { useNavigate } from "react-router-dom";
import {BiExport, BiImport} from "react-icons/bi"
import ModalGlobal from "../../component/ModalGlobal";
import AttendanceCalander from "./AttendanceCalander";
import { DataNotFound } from "../../component/DataNotFound";
const AttendanceList =()=>{
    const [studentId, setStudentId] = useState(null)
    const [addClass, setAddClass] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [deleteClass, setDeleteClass] = useState(false)
    const [isCalander, setIsCalander] = useState(false)
    const [isCalanderData, setIsCalanderData] = useState(null)
    const navigate = useNavigate()
    const tableData = [
        {stu_id: 1, name: "Panther", classes: "A,B,C,D" },
        {stu_id: 2, name: "Lion", classes: "A,B,C,D" },
    ]


    const data2 = tableData?.map((item, ind) => {
        return { stu_id: item?.stu_id, name: item?.name, classes: item?.classes, monthly: item?.monthly }
      });
    
      const editFunction = (row) => {
        return(
          <div className={styles.editList}>
            <BiEdit onClick={()=> editHandler(row?.stu_id)} title="Edit"  />
            <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.stu_id)}  title="Delete"  />
          </div>
        )
      }

      const calanderFunc =(row)=>{
        return(
          <ButtonGlobal onClick={()=> calanderPopFunc(row.stu_id)} width="auto" bgColor="border" size="small" title="View Attendance" />
        )
      }

      const calanderPopFunc = (id)=>{
         setIsCalanderData(id)
         setIsCalander(!isCalander)
      } 
    
      const editHandler=(val)=>{
        setEditClass(!editClass)
        setStudentId(val)
      }
    
  
      const deleteHandler=(val)=>{
        setDeleteClass(!deleteClass)
        setStudentId(val)
      }
    
      const columns = [
      // const columns = useMemo(
      //   () => [
          // {
          //   Header: () => {
          //     // Checkbox header
          //     return <input type="checkbox" />;
          //   },
          //   Cell: ({ row }) => {
          //     // Checkbox cell
          //     return <input type="checkbox" {...row.getToggleRowSelectedProps()} />;
          //   },
          // },
          
          {
            Header: 'Student ID',
            accessor: 'stu_id'
          },
          {
            Header: 'Name',
            accessor: 'name'
          },
          {
            Header: 'Classes',
            accessor: 'classes'
          },
          {
            Header: 'Monthly',
            accessor: calanderFunc
          },
 
          {
            Header: 'Action',
            accessor: editFunction
          }
         
        ]

      const [selectedRows, setSelectedRows] = useState([]);

      const handleSelectedRowsChange = (rows) => {
        setSelectedRows(rows);
      };

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Attendance List</h3>
          <aside>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Export"
          >
          </ButtonGlobal>
          <ButtonGlobal
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Import"
          >
          </ButtonGlobal>
          </aside>
        </section>

            
            {data2 ? (
        // <Table placeholder="Search here..." data={data2} columns={columns} />
        <Table data={data2} columns={columns} onSelectedRowsChange={handleSelectedRowsChange} />

        ) : (
          <DataNotFound />
        )}

        </div>


        {isCalander && 
        <ModalGlobal outSideClick={false} onClose={setIsCalander} activeState={isCalander} width="large">
            <AttendanceCalander />
        </ModalGlobal>}


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

export default AttendanceList;