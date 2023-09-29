import { Container } from "react-bootstrap";
import style from "./Dashboard.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
const Dashboard = () => {
  useDocumentTitle( " الرئيسية");
  return <div className={style.dashboard}>
    
  </div>;
};

export default Dashboard;
