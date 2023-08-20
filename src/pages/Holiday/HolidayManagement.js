import styles from "../../pages/School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"

import ModalGlobal from "../../component/ModalGlobal";
import AddHoliday from "./AddHoliday";
import EditHoliday from "./EditHoliday";
import DeleteHoliday from "./DeleteHoliday";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import { useAuthData, useUserDetailData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const HolidayManagement =()=>{
  const token = Cookies.get('jwtToken');
  const {userDataGlobal} = useUserDetailData();
    const [addHoliday, setAddHoliday] = useState(false)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [holidayData, setHolidayData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [details, setDetails] = useState({})
    const [holidayID, setHolidayID] = useState(null)
    const [ststusID, setStatusID] = useState(null)
    let YEARID = userDataGlobal?.body?.year_id

    const classManageListFunc = async ()=>{
      try {
        const response = await axios.post(
          `${BASE_URL}/holiday/get_holiday_list`,
          {
            offset,
            limit,
            year_id: YEARID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        )
        setHolidayData(response?.data)
    }
   catch (error){
    console.log(error);
   }
}

    const addHolidayHandler=()=>{
      setAddHoliday(!addHoliday)
    }

    const data2 = holidayData?.body?.map((item, ind) => {
        return {  sr_no: ind+1,  holiday_id: item?.holiday_id, title: item?.title, date: item?.date,  description: item?.description,  status: item?.status, year_id: item?.year_id }
      });

      const editHandler=(val)=>{
        setIsEdit(!isEdit)
        setDetails(val)
      }
    
      const deleteHandler=(hid, sid)=>{
        setIsDelete(!isDelete)
        setHolidayID(hid)
        setStatusID(sid)
      }

      const dateFunction =(data)=>{
        const dateObject = new Date(data)
        const formattedDate = dateObject.toLocaleDateString('en-IN');
        return formattedDate;
     }

      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'title', label: 'Title' },
        { id: 'holiday_id', label: 'Holiday ID', hide: true },
        { id: 'description', label: 'Description', width: "30%" },
        { id: 'date', label: 'Date',  format: dateFunction },
        { id: 'status', label: 'status' },
      ];

      const actions = [
        {
          label: <BiEdit title="Edit"  />,
          onClick: row => {
             editHandler(row)
          },
        },
        {
          label: <AiFillDelete title="Delete"  />,
          onClick: row => {
            deleteHandler(row?.holiday_id, row?.status)
          },
        },
      ];

      useEffect(()=>{
        classManageListFunc()
      }, [offset, limit, addHoliday, isEdit, isDelete, YEARID])

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Holiday Management</h3>
          <aside>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Export"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="Import"><BiImport  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addHolidayHandler()} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus  className={styles.abPlus} /></ButtonGlobal>
          </aside>
        </section>

        {data2 ? (
         <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}

        </div>


        {addHoliday && 
        <ModalGlobal heading="Add Holiday" outSideClick={false} onClose={setAddHoliday} activeState={addHoliday} width="large">
            <AddHoliday setAddHoliday={setAddHoliday} yearID={YEARID} />
        </ModalGlobal>}

        {isEdit && 
        <ModalGlobal heading="Edit Holiday" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="large">
            <EditHoliday setIsEdit={setIsEdit} details={details} />
        </ModalGlobal>}

        {isDelete && 
        <ModalGlobal heading="Delete Holiday" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <DeleteHoliday setIsDelete={setIsDelete} ststusID={ststusID} holidayID={holidayID} />
        </ModalGlobal>}

        </Fragment>
    )
}

export default HolidayManagement;