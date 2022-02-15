import { useContext } from "react";
import {DataContext} from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'


const Notify = () => {
    const {state, dispatch} = useContext(DataContext)
    const {notify} = state
    return(
        <>
            {notify.loading && <Loading/>}
            {notify.error && 
                <Toast
                    msg = {{msg: notify.error, title: 'Error'}}
                    handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}
                    bgColor="bg-danger"
                    notifyIcon = {{icon: ' fa-circle-exclamation'}}
                />}
            {notify.success && 
                <Toast
                    msg = {{msg: notify.success, title: 'Success'}}
                    handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}
                    bgColor="bg-success"
                    notifyIcon = {{icon: ' fa-circle-check'}}
                />}
        </>
    )
}

export default Notify