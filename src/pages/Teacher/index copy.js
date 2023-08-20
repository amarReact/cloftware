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
import { DataNotFound } from "../../component/DataNotFound";
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from 'js-cookie';
import AddEnrollTeacher from "../../pageComponent/teacherDash/AddEnrollTeacher";
import {BiSolidFileImport} from "react-icons/bi"
import ImportTeacher from "../../pageComponent/teacherDash/ImportTeacher";
import TableMUI from "../../component/Table/TableMUI";

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


  const editFunction = (row) => {
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.teacher_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.teacher_id)} title="Edit"  />
        {/* <AiFillDelete className={row?.status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.teacher_id, row?.status)}  title="Delete"  /> */}
        <AiFillDelete className={row?.status === "Delete" && styles.ass} onClick={()=> deleteHandler(row?.teacher_id, row?.status)}  title="Delete"  />
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

  const deleteHandler=(val, sts)=>{
    setIsDelete(!isDelete)
    setTeacherId(val)
    setStatusID(sts)
  }

  const checkboxOne = (row) => {
    const admissionEnqId = row?.original?.teacher_id;
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
                background: checkData.includes(row.original.admission_enq_id) ? "red" : "",
              }}
              onClick={() => checkboxOne(row)}
            >
              {row.original.admission_enq_id}
            </span>
          </div>
        ),
      },
      {
        Header: ' SR. No.',
        accessor: 'sr_no'
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
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
  );

  const addEnrollHandler =()=>{
    setAddEnroll(!addEnroll)
    
  }


const handleSelectedRows = (selectedRows) => {
  // const rowIds = selectedRows.map((row) => row.id);
  // setSelectedRowIds(rowIds);
  console.log("selectedRows", selectedRows);
};

const importHandler =()=>{
  setIsImport(!isImport)
}

  useEffect(()=>{
    teacherListFunc()
  }, [offset, limit, isEdit, isDelete])


    // State to hold the selected checkboxes
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    // Callback function to update the selected checkboxes
    const handleSelectionChange = selectedRows => {
      setSelectedCheckboxes(selectedRows);
    };

    // const checkboxOne = (row) => {
    //   const teacherId = row.original.teacher_id;
    //   setSelectedCheckboxes((prevSelectedCheckboxes) => {
    //     if (prevSelectedCheckboxes.includes(teacherId)) {
    //       return prevSelectedCheckboxes.filter((id) => id !== teacherId);
    //     } else {
    //       return [...prevSelectedCheckboxes, teacherId];
    //     }
    //   });
    // };


  const data22 = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];
  
  const columns22 = [
    { id: 'sr_no', label: 'SR. No.', number: true },
    { id: 'teacher_id', label: 'Teacher ID' },
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


  console.log("selectedCheckboxes", selectedCheckboxes)


  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Teacher Management</h3>
          <aside>
          {(checkData.length > 0) && <ButtonGlobal size="small" className={styles.importRight} onClick={addEnrollHandler} bgColor="blue" width="auto" title="Add Enrollment"></ButtonGlobal>}
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><AiOutlinePlusCircle /></ButtonGlobal>
          <ButtonGlobal size="small" onClick={importHandler} className={styles.importRight} bgColor="green" width="auto" title="Import"><BiSolidFileImport /></ButtonGlobal>
          <ButtonGlobal onClick={()=> navigate("/add-teacher")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Teacher"><AiOutlinePlusCircle /></ButtonGlobal>
          </aside>
        </section>

        {data2 && <TableMUI data={data2} columns={columns22} actions={actions} onSelectionChange={handleSelectionChange} /> }

        <h3>Selected Checkboxes:</h3>
        <ul>
          {selectedCheckboxes.map(row => (
            <li key={row.first_name}>{row.first_name}</li>
          ))}
        </ul>
         
        {data2 ? (
        <Table placeholder="Search here..." data={data2} columns={columns} 
        handleSelectedRows={handleSelectedRows} 
        />
      ) : (
        <DataNotFound data={data22} columns={columns22} />
      )}

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
        <ModalGlobal heading="Import Teacher List" outSideClick={false} onClose={setIsImport} activeState={isImport} width="medium">
          <ImportTeacher />
        </ModalGlobal>}

    </div>
  );
};

export default TeacherList;
