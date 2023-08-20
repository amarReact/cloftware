import styles from "./addEditSch.module.css"
import {MdAddLocationAlt} from "react-icons/md"
import { WhiteBox } from "../../component/WhiteBox";
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import classnames from 'classnames';
import {useState} from "react";
import Chart from 'react-apexcharts';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';


const SchoolDash =()=>{

    const options = {
       
        
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            labels: {
              style: {
                colors: ['#000000'], // Set font color
                fontSize: '10px' // Set font size
              }
            }
          },
          dataLabels: {
            style: {
              colors: ['#FFFFFF'], // Set font color
              fontSize: '10px' // Set font size
            }
          },
          colors: ['#BE5A83'], // Set chart color
          grid: {
            borderColor: '#FFFFFF' // Set grid color
          }
      };
      const series = [{
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 105, 60, 30]
      }];

     
      const options2 = {
        chart: {
          id: 'basic-line'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
    
        yaxis: {
            min: 0,
            max: 100,
            labels: {
              style: {
                colors: ['#000000'], // Set font color
                fontSize: '10px' // Set font size
              }
            }
          },
          dataLabels: {
            style: {
              colors: ['#FFFFFF'], // Set font color
              fontSize: '10px' // Set font size
            }
          },
          colors: ['#0EA293'], // Set chart color
          grid: {
            borderColor: '#FFFFFF' // Set grid color
          }


      };
      const series2 = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }];

      const data = [
        { name: 'Jan', sales: 30 },
        { name: 'Feb', sales: 40 },
        { name: 'Mar', sales: 45 },
        { name: 'Apr', sales: 50 },
        { name: 'May', sales: 49 },
        { name: 'Jun', sales: 60 },
        { name: 'Jul', sales: 70 },
        { name: 'Aug', sales: 91 },
        { name: 'Sep', sales: 125 },
        { name: 'Oct', sales: 105 },
        { name: 'Nov', sales: 60 },
        { name: 'Dec', sales: 30 }
      ];

    return(
        <div className={styles.myProfileSt}>
            <h3>School Dashbaord</h3>
            <section className={styles.mpSections}>
                <label>
                    <img src={process.env.PUBLIC_URL + '/images/man.png'} alt="" />
                </label>
                <aside>
                    <h4>Mohan Kumar Gupta <span>Class 12th, Section A</span></h4>
                    <h5><span>Subham Public School, Noida Uttar Pardesh</span></h5>
                </aside>
            </section>

            <section className={styles.mpSectionsBot}>
            <WhiteBox padding="none" radius="none" width="quarter" 
             className={classnames({
                [styles.twists]: true
              })}>
                <aside><h4><span>1</span> No. of students</h4>
                <p>500000  <button>View All</button></p>
                </aside>
            </WhiteBox>
            <WhiteBox padding="none" radius="none" width="quarter" 
             className={classnames({
                [styles.twists]: true,
                [styles.twistsTw]: true,
              })}>
            <aside> <h4><span>2</span> No. of Teacher</h4>
                <p>500000   <button>View All</button></p>
     
                </aside>
            </WhiteBox>
            <WhiteBox padding="none" radius="none" width="quarter" 
             className={classnames({
                [styles.twists]: true,
                [styles.twistsThr]: true,
              })}>
            <aside><h4><span>3</span>No. of non-teaching Staff</h4>
                <p>500000 <button>View All</button></p>
                
                </aside>
            </WhiteBox>
            </section>

            <section className={styles.mpSectionsBot}>
            <WhiteBox padding="none" radius="none" width="half" 
             className={classnames({
                [styles.twists]: true
              })}>
                <aside><h4><span>1</span>School Details</h4>
                <Chart options={options} series={series} type="bar" height={320} />
                </aside>
            </WhiteBox>
            <WhiteBox padding="none" radius="none" width="half" 
             className={classnames({
                [styles.twists]: true,
                [styles.twistsTw]: true,
              })}>
            <aside> <h4><span>2</span>Teacher Details</h4>
            {/* <BarChart width={500} height={320} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart> */}
                  <Chart options={options2} series={series2} type="line" height={320} />

                </aside>
            </WhiteBox>
           
            </section>
            <ToastContainer />
        </div>
           
    )
}

export default SchoolDash;