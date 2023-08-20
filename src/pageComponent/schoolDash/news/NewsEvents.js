// import styles from "./news.module.css";
import styles from "../../../pages/School/sList.module.css";
import ButtonGlobal from "../../../component/ButtonGlobal";
import { useNavigate } from "react-router-dom";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import AddNewsEvents from "./AddNewsEvents";
import {BiEdit} from "react-icons/bi"
import { Fragment, useState, useEffect } from "react";
import ModalGlobal from "../../../component/ModalGlobal";
import NewsEventsEdit from "./NewsEventsEdit";
import NewsEventsDelete from "./NewsEventsDelete";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../redux/constants/constants";
import { useAuthData, useUserDetailData } from "../../../utlis";
import { DataNotFound } from "../../../component/DataNotFound";
import TableMUI from "../../../component/Table/TableMUI";
import {FaPlus} from "react-icons/fa"
import {PiExportBold} from "react-icons/pi"
import {BiImport} from "react-icons/bi"

const NewsEvents = () => {
  const token = Cookies.get("jwtToken");
  const { authList } = useAuthData();
  const { userDataGlobal } = useUserDetailData();
  const [newsData, setNewsData] = useState([]);

  const navigate = useNavigate();
  const [addNews, setAddNews] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [eventID, setEventID] = useState(null);
  const [detail, setDetail] = useState({});

  const newsEventsListFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/event/get_event_list`,
        {
          offset,
          limit,
          year_id: userDataGlobal?.body?.year_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewsData(response?.data);

    } catch (error) {
      console.log(error);
    }
  };

  const data2 = newsData?.body?.map((item, ind) => {
    return { sr_no: ind+1, event_id: item?.event_id, year_id: item?.year_id, school_id: item?.school_id, title: item?.title, description: item?.description, date: item?.date, event_status: item?.event_status }
  });

  const addEventsFunc = () => {
    setAddNews(!addNews);
  };

  const editHandler = (id) => {
    setEditNews(!editNews);
    setDetail(id);
  };

  const deleteHandler = (id) => {
    setIsDelete(!isDelete);
    setEventID(id);
  };


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
      deleteHandler(row?.event_id, row?.event_status)
    },
  },
];

const dateFunction =(data)=>{
   const dateObject = new Date(data)
   const formattedDate = dateObject.toLocaleDateString('en-IN');
   return formattedDate;
}

const columnsMi = [
  { id: 'sr_no', label: 'SR. No.', number: true },
  { id: 'event_id', label: 'Event ID', hide: true },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description', width: '45%' },
  { id: 'date', label: 'Date', format: dateFunction },
  { id: 'event_status', label: 'Event Status' }
];

  useEffect(() => {
      newsEventsListFunc();
  }, [offset, limit, addNews, isDelete, editNews, userDataGlobal]);
  
  return (
    <Fragment>
      {/* <div className={styles.newsProfileSt}> */}
      <div className={styles.sListCntr}>
        <section className="headingTop">
          <h3>News & Events</h3>
          <aside>
            <ButtonGlobal onClick={() => addEventsFunc()} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add"><PiExportBold  className={styles.abExIm} /></ButtonGlobal>
          </aside>
        </section>

        <section className={styles.newsSections}>

        {data2 ? <TableMUI data={data2} columns={columnsMi} actions={actions}  />
        :
        <DataNotFound />
        }

        </section>
      </div>

      {addNews && (
        <ModalGlobal
          heading="Add News and Events"
          outSideClick={false}
          onClose={setAddNews}
          activeState={addNews}
          width="large"
        >
          <AddNewsEvents
            setAddNews={setAddNews}
            yearID={userDataGlobal?.body?.year_id}
          />
        </ModalGlobal>
      )}

      {editNews && (
        <ModalGlobal
          heading="Edit News and Events"
          outSideClick={false}
          onClose={setEditNews}
          activeState={editNews}
          width="large"
        >
          <NewsEventsEdit
            detail={detail}
            yearID={userDataGlobal?.body?.year_id}
            setEditNews={setEditNews}
          />
        </ModalGlobal>
      )}

      {isDelete && (
        <ModalGlobal
          heading="Delete News and Events"
          outSideClick={false}
          onClose={setIsDelete}
          activeState={isDelete}
          width="small"
        >
          <NewsEventsDelete eventID={eventID} setIsDelete={setIsDelete} />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default NewsEvents;
