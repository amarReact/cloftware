import styles from "../School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useState, useRef } from "react";
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
import { DataNotFound } from "../../component/DataNotFound";
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from 'js-cookie';
import AddEnrollTeacher from "../../pageComponent/teacherDash/AddEnrollTeacher";
import {BiSolidFileImport} from "react-icons/bi"
import ImportTeacher from "../../pageComponent/teacherDash/ImportTeacher";
import TableMUI from "../../component/Table/TableMUI";
import ExportTeacher from "../../pageComponent/teacherDash/ExportTeacher";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const TeacherList = () => {
  const token = Cookies.get('jwtToken');
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [teacherId, setTeacherId] = useState(null)
  const [ststusID, setStatusID] = useState(null)
  const [studentData, setStudentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [addEnroll, setAddEnroll] = useState(false)
  const navigate = useNavigate()
  const [checkData, setCheckData] = useState("")
  const [isImport, setIsImport] = useState(false)
  const [isExport, setIsExport] = useState(false)
  
  const teacherListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/teacher/get_teachers_list`,
        {
          offset,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      setStudentData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data2 = studentData?.body?.map((item, ind) => {
    return { sr_no: ind+1, teacher_id: item?.teacher_id, first_name: item?.first_name, gender: item?.gender, emergency_contact_name: item?.emergency_contact_name, emergency_contact_relationship: item?.emergency_contact_relationship, marital_status: item?.marital_status, phone_number: item?.phone_number, state: item?.state,  city: item?.city,  pin_code: item?.pin_code, status: item?.status  }
  });

  const editHandler=(val)=>{
    setIsEdit(!isEdit)
    setTeacherId(val)
  }

  const viewHandler=(val)=>{
    setIsDetail(!isDetail)
    setTeacherId(val)
  }

  const deleteHandler=(val, sts)=>{
    setIsDelete(!isDelete)
    setTeacherId(val)
    setStatusID(sts)
  }

  const addEnrollHandler =()=>{
    setAddEnroll(!addEnroll)
    
  }

  const importHandler =()=>{
    setIsImport(!isImport)
  }

  const exportHandler=()=>{
    setIsExport(!isImport)
  }

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleSelectionChange = selectedRows => {
  };
  
  const columnsMi = [
    { id: 'sr_no', label: 'SR. No.',  number: true  },
    { id: 'teacher_id', label: 'Teacher ID', hide:true },
    { id: 'first_name', label: 'Name' },
    { id: 'marital_status', label: 'Marital status' },
    { id: 'phone_number', label: 'Phone number' },
    { id: 'state', label: 'State' },
    { id: 'city', label: 'City' },
    { id: 'status', label: 'Status' },
  ];

  const actions = [
    {
      label: <AiFillEye title="View" />,
      onClick: row => {
        viewHandler(row?.teacher_id)
      },
    },
    {
      label: <BiEdit title="Edit"  />,
      onClick: row => {
         editHandler(row?.teacher_id)
      },
    },
    {
      label: <AiFillDelete title="Delete"  />,
      onClick: row => {
        deleteHandler(row?.teacher_id, row?.status)
      },
    },
  ];

  useEffect(()=>{
    teacherListFunc()
  }, [offset, limit, isEdit, isDelete])

  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Teacher Management</h3>
          <aside>
          {(!selectedCheckboxes.length > 0) && <ButtonGlobal size="small" className={styles.importRight} onClick={addEnrollHandler} bgColor="green" width="auto" title="Add Enrollment"></ButtonGlobal>}
          <ButtonGlobal onClick={exportHandler}  size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" onClick={importHandler} className={styles.importRight}  width="auto" bgColor="green" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> navigate("/add-teacher")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus className={styles.abPlus} /></ButtonGlobal>
          </aside>
        </section>

        {data2 ? <TableMUI data={data2} columns={columnsMi} actions={actions} onSelectionChange={handleSelectionChange} />
        :
        <DataNotFound />
        }
         
        {isEdit && 
        <ModalGlobal heading="Teacher Edit" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditTeacher techId={teacherId} setIsEdit={setIsEdit}  />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Teacher Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <TeacherDeatil techId={teacherId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Teacher Status" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <TeacherDelete techId={teacherId} setIsDelete={setIsDelete} ststusID={ststusID}  />
        </ModalGlobal>}

        {addEnroll && 
        <ModalGlobal heading="Add Teacher Enrollment" outSideClick={false} onClose={setAddEnroll} activeState={addEnroll} width="medium">
            <AddEnrollTeacher checkData={checkData} setAddEnroll={setAddEnroll} />
        </ModalGlobal>}

        {isImport && 
        <ModalGlobal heading="Import Teacher" outSideClick={false} onClose={setIsImport} activeState={isImport} width="medium">
          <ImportTeacher />
        </ModalGlobal>}

        {isExport && 
        <ModalGlobal heading="Export Teacher" outSideClick={false} onClose={setIsExport} activeState={isExport} width="medium">
          <ExportTeacher />
        </ModalGlobal>}

    </div>
  );
};

export default TeacherList;
