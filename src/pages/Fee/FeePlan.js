import styles from "../../pages/School/sList.module.css";
import styles2 from "../../component/Table/tb.module.css";
import { ToastContainer, toast } from "react-toastify";
import ButtonGlobal from "../../component/ButtonGlobal";
import Table from "../../component/Table";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Fragment, useEffect, useMemo, useState } from "react";
import ModalGlobal from "../../component/ModalGlobal";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../redux/constants/constants";
import FeeSetup from "./FeeSetup";
import FeeSetupEdit from "./FeeSetupEdit";
import { DataNotFound } from "../../component/DataNotFound";
import { useUserDetailData } from "../../utlis";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const FeePlan = () => {
  const token = Cookies.get("jwtToken");
  const [studentId, setStudentId] = useState(null);
  const [addFee, setAddFee] = useState(false);
  const [deleteClass, setDeleteClass] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [feePlanData, setFeePlanData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [feeID, setFeeID] = useState("");
  const [detail, setDetail] = useState({});
  const  {userDataGlobal} = useUserDetailData()

  const feePlanListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fees/fee_submission_plan`,
        {
          class_id: 55,
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
    setAddFee(!addFee);
  };

  const data2 = feePlanData?.body?.map((item, ind) => {
    return {
      fee_name: item?.fee_name,
      fee_name: item?.fee_name,
      amount: item?.amount,
    };
  });

  const editFunction = (row) => {
    return (
      <div className={styles.editList}>
        <BiEdit onClick={() => editHandler(row)} title="Edit" />
      </div>
    );
  };

  const editHandler = (val) => {
    setIsEdit(!isEdit);
    setDetail(val);
  };

  const deleteHandler = (val) => {
    setDeleteClass(!deleteClass);
    setStudentId(val);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ssss",
        accessor: "fee_id",
      },

      {
        Header: "Fee Name",
        accessor: "fee_name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Action",
        accessor: editFunction,
      },
    ],
    []
  );

  useEffect(() => {
    feePlanListFunc();
  }, [offset, limit, addFee, isEdit, isDelete]);

  const renderTable = () => {
    return feePlanData?.body?.map((item, index) => {
      console.log("item", item)
      const columns = Object.keys(item).map((key, columnIndex) => {
        return (
          <td colspan="1" key={columnIndex}>
            {item[key]}
          </td>
        );
      });
      return (
        <tr key={index}>
          {columns} <td>Edit</td>
        </tr>
      );
    });
  };

  const renderTableTh = () => {
    const firstItem = feePlanData?.body?.[0]; // Get the first item from the array
    if (!firstItem) {
      return null; // Return null if the first item is not available or the array is empty
    }
    return Object.keys(firstItem).map((key, columnIndex) => (
      <th colspan="1" key={columnIndex}>
        {columnIndex === 0 ? "Fee Type" : key}
      </th>
    ));
  };

  return (
    <Fragment>
      <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>Fee Plan</h3>

          <aside>
            <ButtonGlobal
              size="small"
              width="auto"
              title=""
              bgColor="green"
              className={styles.importRightText}
            >
              {userDataGlobal?.body?.year_title}
            </ButtonGlobal>
            
            <ButtonGlobal
              onClick={() => addFeeHandler(1)}
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

       {(renderTableTh() && renderTable()) 
       ? <section className={styles2.tableFull}>
       <div className="globaltable">
         <table>
           <tr>
             {renderTableTh()}
             <th>Edit</th>
           </tr>
           <tbody>{renderTable()}</tbody>
         </table>
       </div>
     </section>
     : 
     <DataNotFound />

       } 

      </div>

      {addFee && (
        <ModalGlobal
          heading="Add Fee Plan"
          outSideClick={false}
          onClose={setAddFee}
          activeState={addFee}
          width="large"
        >
          <FeeSetup setAddFee={setAddFee} />
        </ModalGlobal>
      )}

      {isEdit && (
        <ModalGlobal
          heading="Edit Fee Plan"
          outSideClick={false}
          onClose={setIsEdit}
          activeState={isEdit}
          width="large"
        >
          <FeeSetupEdit detail={detail} feeID={feeID} setIsEdit={setIsEdit} />
        </ModalGlobal>
      )}

    </Fragment>
  );
};

export default FeePlan;
