import styles from './Toast.module.css'

const Toast = ({msg, handleShow, bgColor, notifyIcon}) => {
  return (
    <div 
    className={`toast show position-fixed text-light showTopRight ${styles.showTopRight} ${bgColor}`} 
    role="alert" 
    aria-live="assertive" 
    aria-atomic="true"
    data-bs-delay="10000"
    data-bs-autohide="true"
    >
        <div className={`toast-header ${bgColor}`}>
            
            <i className={`fa-solid ${notifyIcon.icon} text-light`} 
              style={{fontSize: '1.2rem', }}
            ></i>
            <strong className="me-auto text-light ps-2"
              style={{fontSize: '1.2rem', paddingBottom: '2px'}}
            >{msg.title}</strong>
            <button 
            type="button" 
            className="btn-close btn-close-white" 
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={handleShow}
             ></button>
        </div>
        <div className="toast-body">{msg.msg}</div>
    </div>
  )
}

export default Toast