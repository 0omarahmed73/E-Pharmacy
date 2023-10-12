import style from "./MedicineItem.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
const MedicineItem = ({name , idx , ...props}) => {
  return (
  <div {...props}>
      <div className={style.item}>
        <h1 className={style.index}>{idx}</h1>
        <h1 className={style.medicine} dir="ltr">
          {name}
        </h1>
        <div className={style.icons}>
          <div className={style.arrow}>
            <BsFillArrowLeftCircleFill size={20} />
          </div>
          <div className={style.arrow}>
            <BsFillArrowLeftCircleFill size={20} />
          </div>
        </div>
      </div>
  </div>
  );
};

export default MedicineItem;
