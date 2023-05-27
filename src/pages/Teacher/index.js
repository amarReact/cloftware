import styles from "../School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import {useEffect, useMemo} from "react"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import ModalGlobal from "../../component/ModalGlobal";
import TeacherDeatil from "../../pageComponent/teacherDash/TeacherDeatil";
import TeacherDelete from "../../pageComponent/teacherDash/TeacherDelete";
import EditTeacher from "../../pageComponent/teacherDash/EditTeacher";
import { BASE_URL } from "../../redux/constants/constants";

const TeacherList = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [teacherId, setTeacherId] = useState(null)
  const [studentData, setStudentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate()
  
  const teacherListFunc = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/teacher/get_teachers_list`, {
        offset,
        limit,
      });
      setStudentData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const data2 = studentData?.body?.map((item, ind) => {
    return { teacher_id: item?.teacher_id, first_name: item?.first_name, gender: item?.gender, emergency_contact_name: item?.emergency_contact_name, emergency_contact_relationship: item?.emergency_contact_relationship, marital_status: item?.marital_status, phone_number: item?.phone_number, state: item?.state,  city: item?.city,  pin_code: item?.pin_code, status: item?.status  }
  });

  const editFunction = (row) => {
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.teacher_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.teacher_id)} title="Edit"  />
        <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.teacher_id)}  title="Delete"  />
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
    setTeacherId(val)
  }

  const viewHandler=(val)=>{
    setIsDetail(!isDetail)
    setTeacherId(val)
  }

  const deleteHandler=(val)=>{
    setIsDelete(!isDelete)
    setTeacherId(val)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Teacher ID',
        accessor: 'teacher_id'
      },
      {
        Header: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
      // {
      //   Header: 'Emergency contact name',
      //   accessor: 'emergency_contact_name'
      // },
    
      {
        Header: 'Marital status',
        accessor: 'marital_status'
      },

      {
        Header: 'Phone number',
        accessor: 'phone_number'
      },
      {
        Header: 'State',
        accessor: 'state'
      },
      {
        Header: 'City',
        accessor: 'city'
      },
      {
        Header: 'Pincode',
        accessor: 'pin_code'
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
    teacherListFunc()
  }, [offset, limit, isEdit, isDelete])

  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Teacher Management</h3>
          <ButtonGlobal onClick={()=> navigate("/add-teacher")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Teacher"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>
         
        {data2 && <Table placeholder="Search here..." data={data2} columns={columns} />}

        {isEdit && 
        <ModalGlobal heading="Teacher Edit" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditTeacher techId={teacherId} setIsEdit={setIsEdit}  />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Teacher Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <TeacherDeatil techId={teacherId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Teacher Delete" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <TeacherDelete techId={teacherId} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

    </div>
  );
};

export default TeacherList;
