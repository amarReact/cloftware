import styles from "./dash.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/checkboxGlobal/CheckBoxGlobal";
import { useState } from "react";
import {WhiteBox} from "../../component/WhiteBox"

const Dashboard = () => {
  return (
    <div className={styles.dashbaordCntr}>
      <h2>Dashbaord</h2>
      <div className={`gridRow`}>
        <div className="grid_6">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_6">
            <WhiteBox title="Total Revenue" />
        </div>
      </div>

      <div className={`gridRow`}>
        <div className="grid_4">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_4">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_4">
            <WhiteBox title="Sales Analytics" />
        </div>
      </div>

      <div className={`gridRow`}>
        <div className="grid_3">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Total Revenue" />
        </div>
      </div>

      <div className={`gridRow`}>
        <div className="grid_2">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
