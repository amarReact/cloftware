import { useEffect, useState } from "react";
import styles from "../../schoolDash/sd.module.css";
import axios from "axios";
import { BASE_URL } from "../../../redux/constants/constants";
import { BsPlusLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import Cookies from "js-cookie";

const ClassDeatil = ({ classId }) => {
  const token = Cookies.get("jwtToken");
  const [classDetailData, setClassDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(0);

  const classDetailFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/class/class_details`,
        {
          class_id: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassDetailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const accordianHandler = (id) => {
    if (id === isOpen) {
      return setIsOpen(null);
    }
    setIsOpen(id);
  };

  useEffect(() => {
    classDetailFunc();
  }, [classId]);

  return (
    <div className={styles.sdDiv}>
      {classDetailData && (
        <div className={styles.sdDivIn}>
          <aside>
            <h4 onClick={() => accordianHandler(0)}>
              {isOpen === 0 ? <CgClose /> : <BsPlusLg />} Class Detail
            </h4>
            {isOpen === 0 && (
              <>
                <ul className={styles.flexOne}>
                  <li>
                    <b>Class ID</b> <p>{classDetailData?.body?.class_id}</p>
                  </li>
                  <li>
                    <b>Year ID</b> <p>{classDetailData?.body?.year_id}</p>
                  </li>
                  <li>
                    <b>School ID</b> <p>{classDetailData?.body?.school_id}</p>
                  </li>
                  <li>
                    <b>Class name</b> <p>{classDetailData?.body?.class_name}</p>
                  </li>
                  <li>
                    <b>Class status</b>{" "}
                    <p>{classDetailData?.body?.class_status}</p>
                  </li>
                </ul>
                <ul className={styles.flexOne}>
                  {classDetailData?.body?.section_details &&
                    classDetailData?.body?.section_details.map((item, ind) => {
                      return (
                        <>
                          <li>
                            <b>Section Name & ID</b>{" "}
                            <p>
                              {item?.section_name}, {item?.section_id}
                            </p>
                          </li>
                        </>
                      );
                    })}
                </ul>{" "}
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default ClassDeatil;
