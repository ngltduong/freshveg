import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { getData } from '../../../utils/fetchData'
import { DataContext } from '../../../store/GlobalState'
import { addToCart } from '../../../store/Actions'
import { useRouter } from 'next/router'
const DetailProduct = (props) => {
    const [product, setProduct] = useState(props.product)

    const router = useRouter()

    const [tab, setTab]= useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    // const imgRef = useRef()
    
    useEffect(()=> {
        setProduct(props.product)
    }, [props.product])


    //active tab Method 1: using add class 
    const isActive = idx => {
        if(tab === idx) return " active"
        return ""
    }

    //active tab Method 2: using useEffect and useRef 
    // useEffect(()=> {
    //   const images = imgRef.current.children
    // //   console.log(images)
    // for(let img of images){
    //     img.className = img.className.replace("active", "img-thumbnail rounded")
    // }

    // images[tab].className = "img-thumbnail rounded active"
    // },[tab])

    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>
            <h2>Detail Product</h2>
            <div className="col-md-6">
                <img src={product.images[tab].url} alt={product.images[tab].url} 
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '400px'}}/>  
                <div className="row mx-0" style={{cursor: 'pointer'}}>
                    {product.images.map((img,idx) => (
                        <img key={idx} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(idx)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(idx)}/>
                    ))}     
                </div>  
            </div>
            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="text-danger">${product.price}</h5>
                <div className="row mx-0 d-flex justify-content-between">
                    <div className="col">

                        {
                            product.inStock > 0
                            ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger">Out Stock</h6>
                        }
                    </div>
                    <div className="col">
                        <h6 className="text-danger">Sold: {product.sold}</h6>
                    </div>
                </div>
                <div className="my-2">{product.description}</div>
                <div className="my-2">{product.content}</div>
                <button 
                    type="button" 
                    className="btn btn-dark d-block my-3 px-5"
                    onClick={() => dispatch(addToCart(product, cart))}
                    >
                    Buy
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps({params: {slug}}) {
    
    // console.log(slug)
    
    const res = await getData(`product/item/${slug}`)
    console.log(res)
    //server side rendering
    return {
      props: {
        product: res.product
      }, // will be passed to the page component as props
    }
  }

export default DetailProduct