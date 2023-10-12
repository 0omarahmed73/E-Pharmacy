import style from "./Dashboard.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MedicineItem from "../../components/MedicineItem/MedicineItem";
import { Notification } from "../../components/Notification/Notification";
import { BsFillBellFill } from "react-icons/bs";
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
const Dashboard = () => {
  useDocumentTitle(" الرئيسية");
  const arr = ['Panadol Extra' , 'Cystone' , 'Panadol 500Mg' , 'Panadol 500Mg' , 'Panadol 500Mg']
  return (
    <div
      style={{ margin: "auto"  }}
      className={style.dashboard + " d-flex flex-column px-sm-5 px-0 pb-4`"}
    >
      <h1 className="mainTitle py-2">الرئيسية</h1>
      <Row >
        <Col xs='12' sm='6' md='4' lg='3' className="mb-2">
        <Notification icon={<BsFillBellFill fill='#FFB901' size={24}/>} text={'الإشعارات'} />
        </Col>
        <Col xs='12' sm='6' md='4' lg='3' className="mb-2">
        <Notification icon={<BsFillBellFill fill='#FFB901' size={24}/>} text={'الإشعارات'} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
