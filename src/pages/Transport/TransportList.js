import styles from "../../pages/School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Fragment, useEffect, useMemo, useState} from "react"
import ModalGlobal from "../../component/ModalGlobal";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import AddTransport from "./AddTransport"
import EditTransport from "./EditTransport"
import DeleteTransport from "./DeleteTransport"
import TransportDeatil from "./TransportDeatil"
import { useAuthData, useUserDetailData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"
import {BsFillFileEarmarkPdfFill} from "react-icons/bs"

const TransportList =()=>{
  const token = Cookies.get('jwtToken');
  const {userDataGlobal} = useUserDetailData();
    const [addTransport, setAddTransport] = useState(false)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100);
    const [feePlanData, setFeePlanData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [transportID, setTransportID] = useState("")
    const [detail, setDetail] = useState({})

    let YEARID = userDataGlobal?.body?.year_id

    const feePlanListFunc = async ()=>{
      try {
        const response = await axios.post(
          `${BASE_URL}/transport/get_transport_list`,
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
        setFeePlanData(response?.data)
    }
   catch (error){
    console.log(error);
   }
}

    const addFeeHandler=()=>{
        setAddTransport(!addTransport)
    }

    const data2 = feePlanData?.body?.map((item, ind) => {
        return {  sr_no: ind+1,  transport_id: item?.transport_id, vehicle_type: item?.vehicle_type, vehicle_number: item?.vehicle_number, driver_name: item?.driver_name, driver_phone: item?.driver_phone, helper_name: item?.helper_name, helper_phone: item?.helper_phone, live_tracking: item?.live_tracking, status: item?.status, school_id: item?.school_id, route_number: item?.route_number   }
      });

      const liveTrackingFunc=(data)=>{
        const getLive = <span style={{color: data == "Yes" ? "green" : "red"}}>{data}</span>
        return getLive;
      }
    
      const editHandler=(val)=>{
        setIsEdit(!isEdit)
        setDetail(val)
      }
    
      const deleteHandler=(val)=>{
        setIsDelete(!isDelete)
        setTransportID(val)
      }

      const columnsMi = [
        { id: 'sr_no', label: 'SR. No.', number: true },
        { id: 'driver_name', label: 'Driver Name' },
        { id: 'transport_id', label: 'Transport ID', hide: true },
        { id: 'vehicle_type', label: 'Vehicle Type' },
        { id: 'live_tracking', label: 'Live Tracking', format: liveTrackingFunc },
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
        feePlanListFunc()
      }, [offset, limit, addTransport, isEdit, isDelete, isDetail, YEARID])

    return(
        <Fragment>
        <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Transport Management</h3>
          
          <aside>
          <ButtonGlobal size="small" className={styles.importRightText} bgColor="green" width="auto" title="">{userDataGlobal?.body?.year_title}</ButtonGlobal>

          <ButtonGlobal size="small" className={styles.importRight} bgColor="green" width="auto" title="PDF"><BsFillFileEarmarkPdfFill  className={styles.abExIm} /></ButtonGlobal>
          <ButtonGlobal onClick={()=> addFeeHandler(YEARID)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><FaPlus  className={styles.abPlus} /></ButtonGlobal>
          </aside>
        </section>

        {data2 ? (
         <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}


        </div>

        {addTransport && 
        <ModalGlobal heading="Add Transport" outSideClick={false} onClose={setAddTransport} activeState={addTransport} width="large">
          <AddTransport setAddTransport={setAddTransport} />
        </ModalGlobal>}

        {isEdit && 
        <ModalGlobal heading="Edit Transport" outSideClick={false} onClose={setIsEdit} activeState={isEdit} width="large">
            <EditTransport detail={detail} setIsEdit={setIsEdit} />
        </ModalGlobal>}
        
        {isDelete && 
        <ModalGlobal heading="Delete Transport" outSideClick={false} onClose={setIsDelete} activeState={isDelete} width="small">
            <DeleteTransport setIsDelete={setIsDelete} transportID={transportID} />
        </ModalGlobal>}

        {isDetail && 
        <ModalGlobal heading="Transport Detail" outSideClick={false} onClose={setIsDetail} activeState={isDetail} width="extraLarge">
            <TransportDeatil transportID={transportID}  />
        </ModalGlobal>}

        </Fragment>
    )
}

export default TransportList;