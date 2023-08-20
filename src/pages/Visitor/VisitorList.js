import styles from "../School/sList.module.css";
import { ToastContainer, toast } from "react-toastify";
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalGlobal from "../../component/ModalGlobal";
import AddVisitor from "./AddVisitor";
import EditVisitor from "./EditVisitor";
import DeleteVisitor from "./DeleteVisitor";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../redux/constants/constants";
import VisitorDeatil from "./VisitorDeatil";
import { useAuthData } from "../../utlis";
import { DataNotFound } from "../../component/DataNotFound";
import TableMUI from "../../component/Table/TableMUI";
import { FaPlus } from "react-icons/fa";
import { PiExportBold } from "react-icons/pi";
import { BiImport } from "react-icons/bi";

const VisitorList = () => {
  const token = Cookies.get("jwtToken");
  const { authList } = useAuthData();
  const [visitorData, setVisitorData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [visitorID, setVisitorID] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [yearId, setYearId] = useState(null);
  const [details, setDetails] = useState({});
  const [aeID, setAeID] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  let YEARID = authList?.year_id;

  const classManageListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/visitor/get_visitors_list`,
        {
          offset,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVisitorData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmissionHandler = (id) => {
    setIsAdd(!isAdd);
    setYearId(id);
  };

  const data2 = visitorData?.body?.map((item, ind) => {
    return {
      sr_no: ind + 1,
      name: item?.name,
      purpose: item?.purpose,
      phone: item?.phone,
      person_to_be_visited: item?.person_to_be_visited,
      status: item?.status,
      visitor_id: item?.visitor_id,
    };
  });

  const editFunction = (row) => {
    return (
      <div className={styles.editList}>
        <BiEdit
          onClick={() => editHandler(row?.visitor_id, row)}
          title="Edit"
        />
      </div>
    );
  };

  const statusFunction = (row) => {
    return <button className={styles[row?.status]}>{row?.status}</button>;
  };

  const editHandler = (cid, obj) => {
    setIsEdit(!isEdit);
    setVisitorID(cid);
    setDetails(obj);
  };

  const columnsMi = [
    { id: "sr_no", label: "SR. No.", number: true },
    { id: "name", label: "Name" },
    { id: "visitor_id", label: "Visitor ID", hide: true },
    { id: "purpose", label: "Purpose" },
    { id: "phone", label: "Phone Number" },
    { id: "person_to_be_visited", label: "Person to be Visited" },
    { id: "status", label: "Status" },
  ];

  const actions = [
    {
      label: <BiEdit title="Edit" />,
      onClick: (row) => {
        editHandler(row?.visitor_id, row);
      },
    },
  ];

  const handleSelectedRows = (rowIds, rows) => {
    setSelectedRows(rows);
  };

  useEffect(() => {
    classManageListFunc();
  }, [offset, limit, isAdd, isEdit, isDelete, authList]);

  return (
    <Fragment>
      <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Visitor Enquiry</h3>
          <aside>
            <ButtonGlobal
              size="small"
              className={styles.importRight}
              bgColor="green"
              width="auto"
              title="Export"
            >
              <PiExportBold className={styles.abExIm} />
            </ButtonGlobal>
            <ButtonGlobal
              size="small"
              className={styles.importRight}
              bgColor="green"
              width="auto"
              title="Import"
            >
              <BiImport className={styles.abExIm} />
            </ButtonGlobal>
            <ButtonGlobal
              onClick={() => addAdmissionHandler(YEARID)}
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

      {isAdd && (
        <ModalGlobal
          heading="Add Visitor"
          outSideClick={false}
          onClose={setIsAdd}
          activeState={isAdd}
          width="extraLarge"
        >
          <AddVisitor setIsAdd={setIsAdd} />
        </ModalGlobal>
      )}

      {isEdit && (
        <ModalGlobal
          heading="Edit Visitor"
          outSideClick={false}
          onClose={setIsEdit}
          activeState={isEdit}
          width="extraLarge"
        >
          <EditVisitor
            visitorID={visitorID}
            setIsEdit={setIsEdit}
            details={details}
          />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default VisitorList;
