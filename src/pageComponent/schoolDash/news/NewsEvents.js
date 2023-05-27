import styles from "./news.module.css"
import { WhiteBox } from "../../../component/WhiteBox";
import ButtonGlobal from "../../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import classnames from 'classnames';
import {TfiWrite} from "react-icons/tfi"
import {BsClipboardDataFill} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {MdAutoDelete} from "react-icons/md"
import {BiMessageSquareEdit} from "react-icons/bi"
import InputFields from "../../../component/inputFields/InputFields";
import AddNewsEvents from "./AddNewsEvents";
import { Fragment, useState } from "react";
import ModalGlobal from "../../../component/ModalGlobal";
import NewsEventsEdit from "./NewsEventsEdit";
import NewsEventsDelete from "./NewsEventsDelete";

const NewsEvents =()=>{
    const navigate = useNavigate()
    const [addNews, setAddNews] = useState(false)
    const [editNews, setEditNews] = useState(false)
    const [deleteNews, setDeleteNews] = useState(false)
    
    const editHandler=()=>{
        setEditNews(!editNews)
    }

    const deleteHandler=()=>{
        setDeleteNews(!deleteNews)
    }
  
    return(
        <Fragment>
        <div className={styles.newsProfileSt}>
            <section className={styles.newsTop}>
            <h3>News & Events</h3>
            </section>
            
            <section className={styles.newsSections}>
            <form>
                <InputFields type="search" placeholder="Search Here..." onChange={()=> console.log("dfsbf")} />
            </form>
            <ButtonGlobal onClick={()=> setAddNews(!addNews)} size="small" className={styles.addSchool} bgColor="green" width="auto" title="Add Events"><AiOutlinePlusCircle /></ButtonGlobal>
            </section>

            <section className={styles.newsDvBox}>
            <WhiteBox padding="none" radius="menium" width="full" 
             className={classnames({
                [styles.newsDv]: true
              })}>
                <aside>
                    <label> <img src={process.env.PUBLIC_URL + '/images/blog2.jpeg'} alt="" /></label>
                    <hgroup>
                    <h4>What is Lorem Ipsum? <span><button onClick={()=> editHandler()} className={styles.editNews}><BiMessageSquareEdit />Edit</button> <button onClick={()=> deleteHandler()} className={styles.deleteNews}><MdAutoDelete />Delete</button></span></h4>
                        <h5><span><TfiWrite /> Admin</span> <span><BsClipboardDataFill /> Mar, 11, 2023</span></h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </hgroup>
                </aside>
            </WhiteBox>

            <WhiteBox padding="none" radius="menium" width="full" 
             className={classnames({
                [styles.newsDv]: true
              })}>
                <aside>
                    <label> <img src={process.env.PUBLIC_URL + '/images/blog2.jpeg'} alt="" /></label>
                    <hgroup>
                        <h4>What is Lorem Ipsum? <span><button onClick={()=> editHandler()} className={styles.editNews}><BiMessageSquareEdit />Edit</button> <button onClick={()=> deleteHandler()} className={styles.deleteNews}><MdAutoDelete />Delete</button></span></h4>

                        <h5><span><TfiWrite /> Admin</span> <span><BsClipboardDataFill /> Mar, 11, 2023</span></h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </hgroup>
                </aside>
            </WhiteBox>

            <WhiteBox padding="none" radius="menium" width="full" 
             className={classnames({
                [styles.newsDv]: true
              })}>
                <aside>
                    <label> <img src={process.env.PUBLIC_URL + '/images/blog1.jpeg'} alt="" /></label>
                    <hgroup>
                    <h4>What is Lorem Ipsum? <span><button onClick={()=> editHandler()} className={styles.editNews}><BiMessageSquareEdit />Edit</button> <button onClick={()=> deleteHandler()} className={styles.deleteNews}><MdAutoDelete />Delete</button></span></h4>
                        <h5><span><TfiWrite /> Admin</span> <span><BsClipboardDataFill /> Mar, 11, 2023</span></h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </hgroup>
                </aside>
            </WhiteBox>
            </section>
            <ToastContainer />

        </div>

        {addNews && 
        <ModalGlobal heading="Add News and Events" outSideClick={false} onClose={setAddNews} activeState={addNews} width="large">
            <AddNewsEvents />
        </ModalGlobal>}

        {editNews && 
        <ModalGlobal heading="Edit News and Events" outSideClick={false} onClose={setEditNews} activeState={editNews} width="large">
            <NewsEventsEdit />
        </ModalGlobal>}

        {deleteNews && 
        <ModalGlobal heading="Delete News and Events" outSideClick={false} onClose={setDeleteNews} activeState={deleteNews} width="small">
            <NewsEventsDelete />
        </ModalGlobal>}
           


        </Fragment>
           
    )
}

export default NewsEvents;