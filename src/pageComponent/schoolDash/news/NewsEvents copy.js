import styles from "./news.module.css";
import { WhiteBox } from "../../../component/WhiteBox";
import ButtonGlobal from "../../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
import classnames from "classnames";
import { TfiWrite } from "react-icons/tfi";
import { BsClipboardDataFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdAutoDelete } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import InputFields from "../../../component/inputFields/InputFields";
import {AiFillDelete, AiFillEye, AiOutlinePlusCircle} from "react-icons/ai"
import AddNewsEvents from "./AddNewsEvents";
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

const NewsEvents = () => {
  const token = Cookies.get("jwtToken");
  const { authList } = useAuthData();
  const { userDataGlobal } = useUserDetailData();

  const navigate = useNavigate();
  const [addNews, setAddNews] = useState(false);
  const [editNews, setEditNews] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [newsEventsData, setNewsEventsData] = useState([]);
  const [eventID, setEventID] = useState(null);
  const [detail, setDetail] = useState({});

  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0); // State for total number of pages

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


  
      const newData = response?.data?.body;
  
      // Filter the new data based on the search term
      const filteredData = newData.filter((item) =>
        item?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setNewsEventsData(newData);
      setFilteredData(filteredData.reverse()); // Reverse the order of filtered data
  
      // Calculate total number of pages
      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / limit);
      setTotalPages(totalPages);
  
      // Reset current page to 1 when filtering or searching
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };


  const data2 = studentData?.body?.map((item, ind) => {
    return { sr_no: ind+1, teacher_id: item?.teacher_id, first_name: item?.first_name, gender: item?.gender, emergency_contact_name: item?.emergency_contact_name, emergency_contact_relationship: item?.emergency_contact_relationship, marital_status: item?.marital_status, phone_number: item?.phone_number, state: item?.state,  city: item?.city,  pin_code: item?.pin_code, status: item?.status  }
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = newsEventsData.filter((item) =>
      item?.title.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredData);
    setCurrentPage(1); // Reset current page to 1 when searching
    setTotalPages(Math.ceil(filteredData.length / limit));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setOffset((newPage - 1) * limit);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setOffset((nextPage - 1) * limit);
    }
  };
  

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);

    return formattedDate;
  }

  const handleSelectionChange = selectedRows => {
    // const selectedData = selectedRows.map((v, i)=> v.teacher_id)
    // setSelectedCheckboxes(selectedData);
};

const columnsMi = [
  { id: 'sr_no', label: 'SR. No.', number: true },
  { id: 'teacher_id', label: 'Teacher ID' },
  { id: 'first_name', label: 'Name' },
  { id: 'marital_status', label: 'Marital status' },
  { id: 'phone_number', label: 'Phone number' },
  { id: 'state', label: 'State' },
  { id: 'city', label: 'City' },
  { id: 'status', label: 'Status' },
];

const actions = [
  {
    label: <AiFillEye title="View" />,
    onClick: row => {
      viewHandler(row?.teacher_id)
    },
  },
  {
    label: <BiEdit title="Edit"  />,
    onClick: row => {
       editHandler(row?.teacher_id)
    },
  },
  {
    label: <AiFillDelete title="Delete"  />,
    onClick: row => {
      deleteHandler(row?.teacher_id, row?.status)
    },
  },
];


  useEffect(() => {
    // if (userDataGlobal) {
      newsEventsListFunc();
    // }
  }, [offset, limit, addNews, isDelete, editNews, userDataGlobal]);
  

  return (
    <Fragment>
      <div className={styles.newsProfileSt}>
     
      {data2 ? <TableMUI data={data2} columns={columnsMi} actions={actions} onSelectionChange={handleSelectionChange} />
        :
        <DataNotFound />
        }

        <section className={styles.newsSections}>
          <h3>News & Events</h3>
          <form className={styles.searchForm}>
            <InputFields
              type="search"
              placeholder="Search Here..."
              onChange={handleSearch}
            />
          </form>

          <ButtonGlobal
            onClick={() => addEventsFunc()}
            size="small"
            className={styles.addSchool}
            bgColor="green"
            width="auto"
            title="Add Events"
          >
            <AiOutlinePlusCircle />
          </ButtonGlobal>
        </section>

        <section className={styles.newsDvBox}>
        {filteredData?.length > 0 ? (
  <>
    {filteredData
      .slice((currentPage - 1) * limit, currentPage * limit)
      .map((item, ind) => {
        // Rendering logic
        return (
                    <WhiteBox
                      padding="none"
                      radius="menium"
                      width="full"
                      className={classnames({
                        [styles.newsDv]: true,
                      })}
                    >
                      <aside>
                        <label>
                          {" "}
                          <img
                            src={process.env.PUBLIC_URL + "/images/parents.png"}
                            alt=""
                          />
                        </label>
                        <hgroup>
                          <h4>
                            {item?.title}{" "}
                            <span>
                              <button
                                onClick={() => editHandler(item)}
                                className={styles.editNews}
                              >
                                <BiMessageSquareEdit />
                                Edit
                              </button>{" "}
                              <button
                                onClick={() => deleteHandler(item?.event_id)}
                                className={styles.deleteNews}
                              >
                                <MdAutoDelete />
                                Delete
                              </button>
                            </span>
                          </h4>
                          <h5>
                            <span className={styles[item?.event_status]}>
                              <TfiWrite /> {item?.event_status}
                            </span>{" "}
                            <span>
                              <BsClipboardDataFill /> Event Date:{" "}
                              {formatDate(item?.date)}
                            </span>
                          </h5>
                          <p>{item?.description}</p>
                        </hgroup>
                      </aside>
                    </WhiteBox>
                  );
                })}
              <div className={styles.buttonGroup}>
                <aside>
                  <ButtonGlobal
                    width="auto"
                    size="small"
                    title="Prev"
                    onClick={goToPrevPage}
                    disable={currentPage === 1}
                  />
                   <ButtonGlobal
                    width="auto"
                    size="small"
                    title="Next"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                  />
                </aside>
                <p>{totalPages}</p>
              </div>
            </>
          ) : (
            <DataNotFound />
          )}
        </section>
        <ToastContainer />
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
