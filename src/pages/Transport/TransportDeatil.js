import { useEffect, useState } from "react";
import styles from "../../pageComponent/schoolDash/sd.module.css";
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from "js-cookie";

const TransportDeatil = ({ transportID }) => {
  const token = Cookies.get("jwtToken");
  const [transportDetailData, setTransportDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(0);

  const transportDetailFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/transport/transport_details`,
        {
          transport_id: transportID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransportDetailData(response?.data);
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
    transportDetailFunc();
  }, [transportID]);

  return (
    <div className={styles.sdDiv}>
      {transportDetailData && (
        <div className={styles.sdDivIn}>
          <aside>
            <h4 onClick={() => accordianHandler(0)}>
             
            </h4>
            {isOpen === 0 && (
              <>
                <ul className={styles.flexOne +" "+ styles.flexOneUp}>
                  <li>
                    <b>Transport ID</b> <p>{transportDetailData?.body?.transport_id}</p>
                  </li>
                  <li>
                    <b>School ID</b> <p>{transportDetailData?.body?.school_id}</p>
                  </li>
                  <li>
                    <b>Route number</b> <p>{transportDetailData?.body?.route_number}</p>
                  </li>
                  <li>
                    <b>Vehicle type</b> <p>{transportDetailData?.body?.vehicle_type}</p>
                  </li>
                  <li>
                    <b>Vehicle number</b> <p>{transportDetailData?.body?.vehicle_number}</p>
                  </li>
                  <li>
                    <b>Driver name</b> <p>{transportDetailData?.body?.driver_name}</p>
                  </li>
                  <li>
                    <b>Driver phone</b> <p>{transportDetailData?.body?.driver_phone}</p>
                  </li>
                  <li>
                    <b>Helper name</b> <p>{transportDetailData?.body?.helper_name}</p>
                  </li>
                  <li>
                    <b>Helper phone</b> <p>{transportDetailData?.body?.helper_phone}</p>
                  </li>
                  <li>
                    <b>Live tracking</b> <p>{transportDetailData?.body?.live_tracking}</p>
                  </li>
                  <li>
                    <b>Status</b> <p>{transportDetailData?.body?.status}</p>
                  </li>
                </ul>
            
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default TransportDeatil;
