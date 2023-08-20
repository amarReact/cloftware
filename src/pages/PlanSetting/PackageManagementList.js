import styles from "../../pages/School/sList.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Fragment, useEffect, useMemo, useState } from "react";
import ModalGlobal from "../../component/ModalGlobal";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../redux/constants/constants";
import AddPackage from "./AddPackage";
import EditPackage from "./EditPackage";
import DeleteTransport from "./DeleteTransport";
import TransportDeatil from "./TransportDeatil";
import { useAuthData, useUserDetailData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import { FaPlus } from "react-icons/fa";
import { PiExportBold } from "react-icons/pi";
import { BiImport } from "react-icons/bi";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

const PackageManagementList = () => {
  const token = Cookies.get("jwtToken");
  const { userDataGlobal } = useUserDetailData();
  const [addTransport, setAddTransport] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [feePlanData, setFeePlanData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [transportID, setTransportID] = useState("");
  const [detail, setDetail] = useState({});

  let YEARID = userDataGlobal?.body?.year_id;

  const feePlanListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/package/package_list`,
        {
          offset,
          limit,
          year_id: YEARID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeePlanData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFeeHandler = () => {
    setAddTransport(!addTransport);
  };

  const data2 = feePlanData?.body?.map((item, ind) => {
    return {
      sr_no: ind + 1,
      package_id: item?.package_id,
      package_name: item?.package_name,
      status: item?.status,
    };
  });

  const liveTrackingFunc = (data) => {
    const getLive = (
      <span style={{ color: data == "Yes" ? "green" : "red" }}>{data}</span>
    );
    return getLive;
  };

  const editHandler = (val) => {
    setIsEdit(!isEdit);
    setDetail(val);
  };

  const deleteHandler = (val) => {
    setIsDelete(!isDelete);
    setTransportID(val);
  };

  const columnsMi = [
    { id: "sr_no", label: "SR. No." },
    { id: "package_name", label: "Name" },
    { id: 'package_id', label: 'Package ID', hide: true },
    { id: "status", label: "status" },
  ];

  const actions = [
    {
      label: <BiEdit title="Edit" />,
      onClick: (row) => {
        editHandler(row);
      },
    },
    {
      label: <AiFillDelete title="Delete" />,
      onClick: (row) => {
        deleteHandler(row?.package_id, row?.status);
      },
    },
  ];

  useEffect(() => {
    feePlanListFunc();
  }, [offset, limit, addTransport, isEdit, isDelete, isDetail, YEARID]);

  return (
    <Fragment>
      <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Package Management</h3>

          <aside>
            <ButtonGlobal
              onClick={() => addFeeHandler(YEARID)}
              size="small"
              className={styles.addSchool}
              bgColor="green"
              width="auto"
              title="Add"
            >
              <FaPlus className={styles.abPlus} />
            </ButtonGlobal>
          </aside>
        </section>

        {data2 ? (
          <TableMUI data={data2} columns={columnsMi} actions={actions} />
        ) : (
          <DataNotFound />
        )}
      </div>

      {addTransport && (
        <ModalGlobal
          heading="Add Package"
          outSideClick={false}
          onClose={setAddTransport}
          activeState={addTransport}
          width="large"
        >
          <AddPackage setAddTransport={setAddTransport} />
        </ModalGlobal>
      )}

      {isEdit && (
        <ModalGlobal
          heading="Edit Package"
          outSideClick={false}
          onClose={setIsEdit}
          activeState={isEdit}
          width="small"
        >
          <EditPackage detail={detail} setIsEdit={setIsEdit} />
        </ModalGlobal>
      )}

      {isDelete && (
        <ModalGlobal
          heading="Delete Transport"
          outSideClick={false}
          onClose={setIsDelete}
          activeState={isDelete}
          width="small"
        >
          <DeleteTransport
            setIsDelete={setIsDelete}
            transportID={transportID}
          />
        </ModalGlobal>
      )}

      {isDetail && (
        <ModalGlobal
          heading="Transport Detail"
          outSideClick={false}
          onClose={setIsDetail}
          activeState={isDetail}
          width="extraLarge"
        >
          <TransportDeatil transportID={transportID} />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default PackageManagementList;
