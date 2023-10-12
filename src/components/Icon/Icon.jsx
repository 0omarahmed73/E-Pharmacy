import style from './Icon.module.css'

const Icon = ({icon , shadow = true , ...props}) => {
  return (
    <div className={`${style.icon} ${shadow ? '' : 'shadow-none'}`} {...props} >
      {icon}
    </div>
  )
}

export default Icon