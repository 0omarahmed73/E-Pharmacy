import style from './MediSelected.module.css'
import Icon from './../Icon/Icon';
import {MdModeEditOutline} from 'react-icons/md'
import {BsFillTrashFill} from 'react-icons/bs'

const MediSelected = ({name , quantity , idx , id , handleDelete , handleEdit , setMode ,setId}) => {
  return (
        <tr>
          <td>{idx}</td>
          <td>{name}</td>
          <td>{quantity}</td>
          <td>
            <div className="icons d-flex gap-2 justify-content-center ">
            <Icon onClick={() => {
              setMode('edit')
              handleEdit(id)
              setId(id)
            }} icon={<MdModeEditOutline fill='white'  size={12}/>} shadow={false} style={{width : '25px' , height : '25px'}} />
            <Icon onClick={() => handleDelete(id)} icon={<BsFillTrashFill fill='white'  size={12}/>} shadow={false} style={{width : '25px' , height : '25px'}} />
            </div>
          </td>
        </tr>
  )
}

export default MediSelected