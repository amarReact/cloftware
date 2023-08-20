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
import Cookies from 'js-cookie';
import { DataNotFound } from "../../component/DataNotFound";
import AddEnrollStudent from "../../pageComponent/studentDash/AddEnrollStudent";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const StudentList = () => {
  const token = Cookies.get('jwtToken');
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [studentId, setStudentId] = useState(null)
  const [studentData, setStudentData] = useState([]);
  const [ststusID, setStatusID] = useState(null)
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate()
  const [addEnroll, setAddEnroll] = useState(false)
  const [checkData, setCheckData] = useState("")
  
  const schoolListFunc = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/student/get_students_list`, {
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
  }

  const data2 = studentData?.body?.map((item, ind) => {
    return {sr_no: ind+1, stu_id: item?.stu_id, stu_first_name: item?.stu_first_name, stu_current_address: item?.stu_current_address, stu_state: item?.stu_state, stu_city: item?.stu_city, parent_name: item?.parent_name,
      relationship_to_student: item?.relationship_to_student, phone_number: item?.phone_number, email_id: item?.email_id,  status: item?.status }
  });

  const editFunction = (row) => {
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.stu_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.stu_id)} title="Edit"  />
        <AiFillDelete className={row?.status === "Delete" && styles.ass} onClick={()=> deleteHandler(row?.stu_id, row?.status)}  title="Delete"  />
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

  const deleteHandler=(val, sts)=>{
    setIsDelete(!isDelete)
    setStudentId(val)
    setStatusID(sts)
  }

  const checkboxOne = (row) => {
    const admissionEnqId = row?.original?.stu_id;
    setCheckData((prevCheckData) => {
      if (prevCheckData.includes(admissionEnqId)) {
        return prevCheckData.filter((id) => id !== admissionEnqId);
      } else {
        return [...prevCheckData, admissionEnqId];
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: (
          <div>
            <input type="checkbox" />
          </div>
        ),
        id: 'selection',
        // Cell: ({ row }) => (
        //   <div>
        //     <input onClick={()=> checkboxOne(row)} type="checkbox" {...row.getToggleRowSelectedProps()} />
        //   </div>
        // ),
     
        Cell: ({ row }) => (
          <div>
            <span
              className="checkboxChecked"
              style={{
                background: checkData.includes(row.original.stu_id) ? "red" : "",
              }}
              onClick={() => checkboxOne(row)}
            >
              {row.original.stu_id}
            </span>
          </div>
        ),
      },
      {
        Header: 'SR. No.',
        accessor: 'sr_no'
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

  const handleSelectedRows = (selectedRows) => {
    // Do something with the selectedRows data
    console.log("amar",selectedRows);
  };


  const addEnrollHandler =()=>{
    setAddEnroll(!addEnroll)
  }

  const handleSelectionChange = selectedRows => {
    // const selectedData = selectedRows.map((v, i)=> v.teacher_id)
    // setSelectedCheckboxes(selectedData);
};

  const columnsMi = [
    { id: 'sr_no', label: 'SR. No.', number: true  },
    { id: 'stu_id', label: 'Student ID', hide: true },
    { id: 'stu_first_name', label: 'Name' },
    { id: 'stu_current_address', label: 'Student Address' },
    { id: 'parent_name', label: 'Parent Name' },
    { id: 'relationship_to_student', label: 'Relationship' },
    { id: 'phone_number', label: 'Phone Number' },
    { id: 'status', label: 'Status' },
  ];

  const actions = [
    {
      label: <AiFillEye title="View" />,
      onClick: row => {
        viewHandler(row?.stu_id)
      },
    },
    {
      label: <BiEdit title="Edit"  />,
      onClick: row => {
         editHandler(row?.stu_id)
      },
    },
    {
      label: <AiFillDelete title="Delete"  />,
      onClick: row => {
        deleteHandler(row?.stu_id, row?.status)
      },
    },
  ];

  useEffect(()=>{
    schoolListFunc()
  }, [offset, limit, isEdit, isDelete])

  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Student Management</h3>
          <aside>
          {(checkData.length > 0) && <ButtonGlobal size="small" className={styles.importRight} onClick={addEnrollHandler} bgColor="blue" width="auto" title="Add Enrollment"></ButtonGlobal>}
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> navigate("/add-student")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus className={styles.abPlus} /></ButtonGlobal>

  

          </aside>
        </section>

      {data2 ? ( <TableMUI data={data2} columns={columnsMi} actions={actions}  onSelectionChange={handleSelectionChange} /> ) : (
          <DataNotFound />
        )}

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
            <StudentDelete scId={studentId} setIsDelete={setIsDelete}  ststusID={ststusID} />
        </ModalGlobal>}

        {addEnroll && 
        <ModalGlobal heading="Add Stuent Enrollment" outSideClick={false} onClose={setAddEnroll} activeState={addEnroll} width="medium">
            <AddEnrollStudent checkData={checkData} setAddEnroll={setAddEnroll}  /> 
        </ModalGlobal>}

    </div>
  );
};

export default StudentList;
