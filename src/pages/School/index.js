import styles from "./sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { useState } from "react";
import Table from "../../component/Table";
import axios from "axios";
import {useEffect, useMemo} from "react"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import SchoolDeatil from "../../pageComponent/schoolDash/SchoolDeatil";
import ModalGlobal from "../../component/ModalGlobal";
import SchoolDelete from "../../pageComponent/schoolDash/SchoolDelete";
import { useNavigate } from "react-router-dom";
import EditSchool from "../../pageComponent/schoolDash/EditSchool";


const SchoolList = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [schoolId, setSchoolId] = useState(null)
  const [schoolData, setSchoolData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate()

  const schoolListFunc = async () => {
    try {
    const response = await axios.post(`https://aa8b-203-212-233-211.ngrok-free.app/api/get_school_list`, {
      offset,
      limit,
    });
      setSchoolData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const data2 = schoolData?.body?.map((item, ind) => {
    return { scl_id: item?.scl_id, school_name: item?.school_name, school_phone_number: item?.school_phone_number, school_pin_code: item?.school_pin_code, school_address: item?.school_address, school_city: item?.school_city,
      school_status: item?.school_status, principal_name: item?.principal_name }
  });

  const editFunction = (row) => {
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.scl_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.scl_id)} title="Edit"  />
        <AiFillDelete className={row?.school_status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.scl_id)}  title="Delete"  />
      </div>
    )
  }

  const editHandler=(val)=>{
    setIsEdit(!isEdit)
    setSchoolId(val)
  }

  const viewHandler=(val)=>{
    setIsDetail(!isDetail)
    setSchoolId(val)
  }

  const deleteHandler=(val)=>{
    setIsDelete(!isDelete)
    setSchoolId(val)
  }

  const statusFunction=(row)=>{
    return(
        <button className={styles[row?.school_status]}>{row?.school_status}</button>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Sr. No',
        accessor: 'scl_id'
      },
      {
        Header: 'School name',
        accessor: 'school_name'
      },
      {
        Header: 'School phone',
        accessor: 'school_phone_number'
      },
      {
        Header: 'School pincode',
        accessor: 'school_pin_code'
      },
      {
        Header: 'School address',
        accessor: 'school_address'
      },
      {
        Header: 'School city',
        accessor: 'school_city'
      },
      {
        Header: 'School status',
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
        <section className={styles.headingTop}>
          <h3>School Management</h3>
          <ButtonGlobal onClick={()=> navigate("/add-school")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add School"><AiOutlinePlusCircle /></ButtonGlobal>
        </section>
         
        {data2 && <Table placeholder="Search here..." data={data2} columns={columns} />}

        {isEdit && 
        <ModalGlobal heading="School Detail" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="full">
            <EditSchool scId={schoolId} setIsEdit={setIsEdit}  />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="School Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <SchoolDeatil scId={schoolId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="School Delete" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <SchoolDelete scId={schoolId} setIsDelete={setIsDelete}  />
        </ModalGlobal>}

    </div>
  );
};

export default SchoolList;
