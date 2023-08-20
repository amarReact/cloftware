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
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from 'js-cookie';
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const SchoolList = () => {
  const token = Cookies.get('jwtToken');
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [schoolId, setSchoolId] = useState(null)
  const [schoolData, setSchoolData] = useState([]);
  const [ststusID, setStatusID] = useState(null)
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const navigate = useNavigate()

  const schoolListFunc = async () => {
    try {
    const response = await axios.post(`${BASE_URL}/get_school_list`, {
      offset,
      limit,
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }
    );
      setSchoolData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const data2 = schoolData?.body?.map((item, ind) => {
    return {sr_no: ind+1,  scl_id: item?.scl_id, school_name: item?.school_name, school_phone_number: item?.school_phone_number, school_pin_code: item?.school_pin_code, school_address: item?.school_address, school_city: item?.school_city,
      school_status: item?.school_status, principal_name: item?.principal_name }
  });

  const editFunction = (row) => {
    console.log("row", row)
    return(
      <div className={styles.editList}>
        <AiFillEye onClick={()=> viewHandler(row?.scl_id)} title="View" />
        <BiEdit onClick={()=> editHandler(row?.scl_id)} title="Edit"  />
        {/* <AiFillDelete className={row?.school_status === "Delete" && styles.disabled} onClick={()=> deleteHandler(row?.scl_id)}  title="Delete"  /> */}
        <AiFillDelete className={row?.school_status === "Delete" && styles.ass} onClick={()=> deleteHandler(row?.scl_id, row?.school_status)}  title="Delete"  />
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

  const deleteHandler=(val, sts)=>{
    setIsDelete(!isDelete)
    setSchoolId(val)
    setStatusID(sts)
  }

  const statusFunction=(row)=>{
    return(
        <button className={styles[row?.school_status]}>{row?.school_status}</button>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: 'SR. No.',
        accessor: 'sr_no'
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

  const columnsMi = [
    { id: 'sr_no', label: 'SR. No.', number: true },
    { id: 'scl_id', label: 'School ID', hide:true },
    { id: 'school_name', label: 'School Name' },
    { id: 'school_phone_number', label: 'Phone Number' },
    { id: 'principal_name', label: 'Principal Name' },
    { id: 'school_address', label: 'Address' },
    { id: 'school_city', label: 'City' },
    { id: 'school_status', label: 'Status' },

  ];

  const actions = [
    {
      label: <AiFillEye title="View" />,
      onClick: row => {
        viewHandler(row?.scl_id)
      },
    },
    {
      label: <BiEdit title="Edit"  />,
      onClick: row => {
         editHandler(row?.scl_id)
      },
    },
    {
      label: <AiFillDelete title="Delete"  />,
      onClick: row => {
        deleteHandler(row?.scl_id, row?.status)
      },
    },
  ];


  useEffect(()=>{
    schoolListFunc()
  }, [offset, limit, isEdit, isDelete])

  return (
    <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>School Management</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> navigate("/add-school")} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus className={styles.abPlus} /></ButtonGlobal>
          
          </aside>
        </section>
         
      

        {/* {data2 ? (
        <Table placeholder="Search here..." data={data2} columns={columns} />
        ) : (
          <DataNotFound />
        )} */}

      {data2 ? <TableMUI data={data2} columns={columnsMi} actions={actions} />
        :
        <DataNotFound />
        }

        {isEdit && 
        <ModalGlobal heading="School Edit" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="extraLarge">
            <EditSchool scId={schoolId} setIsEdit={setIsEdit}  />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="School Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <SchoolDeatil scId={schoolId}  />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="School Delete" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <SchoolDelete scId={schoolId} setIsDelete={setIsDelete} ststusID={ststusID} />
        </ModalGlobal>}

        

    </div>
  );
};

export default SchoolList;
