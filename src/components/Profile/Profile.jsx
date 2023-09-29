import style from './Profile.module.css'
import {AiFillCaretDown} from 'react-icons/ai'

const Profile = () => {
  return (
    <div className={style.profile}>
        <div className={style.profImg}>
          <img src='https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80' alt="" />
        </div>
        <div className="profTexts d-flex flex-column ms-2">
          <small>د/محمود وائل</small>
          <small >مدير المخزن</small>
        </div>
        <AiFillCaretDown size={13}  style={{marginRight : '10px'}}/>
    </div>
  )
}

export default Profile