import styles from "../School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import {useEffect, useMemo} from "react"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import StudentDeatil from "../../pageComponent/studentDash/StudentDeatil";
import ModalGlobal from "../../component/ModalGlobal";
import StudentDelete from "../../pageComponent/studentDash/StudentDelete";
import { useNavigate } from "react-router-dom";
import EditStudent from "../../pageComponent/studentDash/EditStudent";
import { BASE_URL } from "../../redux/constants/constants";

const StudentList = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [studentId, setStudentId] = useState(null)
  const [studentData, setStudentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate()
  
  const schoolListFunc = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/student/get_students_list`, {
        offset,
        limit,
      });
      setStudentData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const data2 = studentData?.body?.map((item, ind) => {
    return { stu_id: item?.stu_id, stu_first_name: item?.stu_first_name, stu_current_address: item?.stu_current_address, stu_state: item?.stu_state, stu_city: item?.stu_city, parent_name: item?.parent_name,
      relationship_to_student: item?.relationship_to_student, phone_number: item?.phone_number, email_id: item?.email_id,  status: item?.status }
  });

  const editFunction = (row) => {
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.stu_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.stu_id)} title="Edit"  />
        <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.stu_id)}  title="Delete"  />
      </div>
    )
  }

  const statusFunction=(row)=>{
    return(
        <button className={styles[row?.status]}>{row?.status}</button>
    )
  }

  const editHandler=(val)=>{
    setIsEdit(!isEdit)
    setStudentId(val)
  }

  const viewHandler=(val)=>{
    setIsDetail(!isDetail)
    setStudentId(val)
  }

  const deleteHandler=(val)=>{
    setIsDelete(!isDelete)
    setStudentId(val)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Stu. ID',
        accessor: 'stu_id'
      },
      {
        Header: 'First Name',
        accessor: 'stu_first_name'
      },
      {
        Header: 'Student Address',
        accessor: 'stu_current_address'
      },
      {
        Header: 'Student State',
        accessor: 'stu_state'
      },
      {
        Header: 'Student city',
        accessor: 'stu_city'
      },
      {
        Header: 'Parent name',
        accessor: 'parent_name'
      },
      {
        Header: 'Relationship to student',
        accessor: 'relationship_to_student'
      },
      {
        Header: 'Phone number',
        accessor: 'phone_number'
      },
      {
        Header: 'status',
        accessor: statusFunction
      },
      {
        Header: 'Action',
        accessor: editFunction
      }
     
    ],
    []
  )


  useEffect(()=>{
    schoolListFunc()
  }, [offset, limit, isEdit, isDelete])

  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Student Management</h3>
          <ButtonGlobal onClick={()=> navigate("/add-student")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Student"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>
         
        {data2 && <Table placeholder="Search here..." data={data2} columns={columns} />}

        {isEdit && 
        <ModalGlobal heading="Student Edit" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditStudent scId={studentId} setIsEdit={setIsEdit}  />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Student Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <StudentDeatil scId={studentId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Student Delete" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <StudentDelete scId={studentId} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

    </div>
  );
};

export default StudentList;
