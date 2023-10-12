import { Col, Row } from 'react-bootstrap';
import style from './Medicine.module.css'
import { FaAddressBook, FaAdn } from 'react-icons/fa';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import MenuItem from '../../../components/MenuItem/MenuItem';
import { GiMedicinePills, GiMedicines } from 'react-icons/gi';
import { BiInjection } from 'react-icons/bi';
const Medicine = () => {
  useDocumentTitle(" الأدوية");
  return (
    <div
      style={{ margin: "auto" }}
      className={style.dashboard + " d-flex flex-column px-sm-5 px-0 pb-4`"}
    >
      <h1 className="mainTitle pb-2 pb-lg-0">الأدوية</h1>
      <Row
        lg="3"
        sm="1"
        md="2"
        xs="1"
        className="justify-content-center d-flex"
      >
        <Col>
          <MenuItem
            title="الأقراص"
            icon={<GiMedicines size={32} color="white" />}
            padding="30px"
            pt="mt-2 mt-md-0"
          />
        </Col>
        <Col>
          <MenuItem
            title="امبولات"
            icon={<BiInjection size={32} color="white" />}
            padding="30px"
            pt="mt-2 mt-md-0"
          />
        </Col>
      </Row>
      <Row
        lg="3"
        sm="1"
        md="2"
        xs="1"
        className="pt-md-2 justify-content-center d-flex"
      >
        <Col>
          <MenuItem
            title="منوعات"
            icon={<GiMedicinePills size={32} color="white" />}
            padding="30px"
            pt="mt-2 mt-md-0"
          />
        </Col>
        <Col>
          <MenuItem
            title="جميع الانواع"
            padding="46px"
            pt="mt-2 mt-md-0"
          />
        </Col>
      </Row>
    </div>
  );
};


export default Medicine