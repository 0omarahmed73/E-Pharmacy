import style from './Icon.module.css'

const Icon = ({icon , ...props}) => {
  return (
    <div className={style.icon} {...props}>
      {icon}
    </div>
  )
}

export default Icon