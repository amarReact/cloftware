
import { Grid } from "@mui/material";
import ButtonGlobal from "../../component/ButtonGlobal";
import styles from "../schoolDash/sd.module.css"
import React, { Fragment, useState } from 'react';
import { BASE_URL } from "../../redux/constants/constants";
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const ImportTeacher =()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(100);
    const token = Cookies.get('jwtToken');

    const downloadLink = `${BASE_URL}/teacher/export_teacher_excel`

    const handleDownloadClick = () => {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.setAttribute('download', 'teachers.xlsx'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };
    
      const handleFileUpload = () => {
        console.log("selectedFile", selectedFile)
        importFunc()
        if (selectedFile) {
         
        } else {
          // alert('Please select a file to upload.');
          toast.error("Please select a file to upload.", {autoClose: 500, position: "top-center"});
        }
      };
    
      const importFunc = async () =>{
        try{
        const response = await axios.post(`${BASE_URL}/teacher/import_teacher_excel`, 
        {
          execel_file: selectedFile?.name,
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}` 
        //   }
        // }
        )
        } catch (error) {
          console.log(error);
          toast.error(error.message, {autoClose: 500, position: "top-center"});
        }
      }


    return(
      <Fragment>
        <Grid container className={styles.importTeacherCntr}>
            <Grid item xs={12} md={12} className={styles.importTeacherCntr1}>
               <ButtonGlobal onClick={handleDownloadClick} className={styles.dowCsvBtn}  bgColor="green" size="small" width="auto" title="Download CSV" />
            </Grid>
            <Grid item xs={12} md={12} className={styles.importTeacherCntr2}>
              <p>Upload your CSV file here:</p>
       

        <div className="file-upload-container">
            <label className="upload-btn">
                Choose File
                <input type="file" onChange={handleFileChange} />
            </label>
            {selectedFile && <div className="file-name">Selected file: {selectedFile.name}</div>}
            <ButtonGlobal disable={selectedFile ? false : true} size="small" bgColor="green" width="auto" onClick={handleFileUpload} title="Upload File"></ButtonGlobal>
            </div>
  
            </Grid>
        </Grid>
   

<ToastContainer />
        </Fragment>
    )
}

export default ImportTeacher