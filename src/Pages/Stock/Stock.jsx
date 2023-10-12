import useDocumentTitle from '../../hooks/useDocumentTitle';
import style from './Stock.module.css'
import { FaAddressBook, FaAdn } from 'react-icons/fa';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import MenuItem from '../../components/MenuItem/MenuItem';
const Stock = () => {
  useDocumentTitle(" إدارة المخازن");
  return (
    <div
      style={{ margin: "auto" }}
      className={style.dashboard + " d-flex flex-column px-sm-5 px-0 pb-4`"}
    >
      <h1 className="mainTitle pb-2 pb-lg-0">إدارة المخازن</h1>
      <Row
        lg="3"
        sm="1"
        md="2"
        xs="1"
        className="justify-content-center d-flex"
      >
        <Col>
          <MenuItem
            title="حصر الأصناف"
            padding="40px"
            pt="mt-2 mt-md-0"
          />
        </Col>
        <Col>
          <MenuItem
            to='/stock/medicines'
            title="الأدوية"
            padding="40px"
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
            title="عهدة المخزن"
            padding="40px"
            pt="mt-2 mt-md-0"
          />
        </Col>
        <Col>
          <MenuItem
            to='/stock/new-order'
            title="الواردات"
            padding="40px"
            pt="mt-2 mt-md-0"
          />
        </Col>
      </Row>
      <Row
        lg="3"
        sm="1"
        md="2"
        xs="1"
        className="pt-md-2 mb-2 justify-content-center d-flex "
      >
        <Col>
          <MenuItem
            to='/stock/medicine-dispense'
            title="صرف الأدوية"
            padding="40px"
            pt="mt-2 mt-md-0"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Stock