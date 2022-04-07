import Head from 'next/head'
import { useState, useContext, useEffect} from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../components/OrderDetail'
import { Wrapper, Container } from '../../styles/Global.style'
const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state
    const router = useRouter()
    
    const [orderDetail, setOrderDetail] = useState([])
    useEffect(()=> {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
    
    // console.log(router)
    if(!auth.user) return null

    return (
        <Wrapper>
            <Container>
                <div className="my-3">
                    <Head>
                        <title>DetailOrder Page</title>
                    </Head>
                    <div>
                        <button className="btn btn-dark" onClick={() => router.back()}>
                            <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                        </button>
                    </div>
                    <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch}/>
                </div>
            </Container>
        </Wrapper>
    )
}

export default DetailOrder