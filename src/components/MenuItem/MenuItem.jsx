import { Link } from "react-router-dom";
import style from "./MenuItem.module.css";

const MenuItem = ({title , icon = '' , padding = '20px' , pt , to = '/'}) => {
  return (
    <Link to={to} className={`${style.rectangle2} ${pt} text-decoration-none `} style={{paddingBlock : padding}} >
      <div className={style.image2} alt="">
      {icon}
      </div>
      <p className={`${style.te2} m-0`}>
        <strong>{title}</strong>
      </p>
    </Link>
  );
};

export default MenuItem;
