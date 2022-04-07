import Head from 'next/head'
import Image from 'next/image'
import { useState, useContext, useEffect } from 'react'
import { getData } from '../../../utils/fetchData'
import { DataContext } from '../../../store/GlobalState'
import { addToCart } from '../../../store/Actions'
import { useRouter } from 'next/router'
import { Container } from '../../../styles/Global.style'
const DetailProduct = (props) => {
    const [product, setProduct] = useState(props.product)

    const router = useRouter()

    const [tab, setTab]= useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const [isReadMore, setIsReadMore] = useState(true)

    const [contentProduct, setContentProduct] = useState('')

    // const imgRef = useRef()
    
    useEffect(()=> {
        setProduct(props.product)
    }, [props.product])


    const handleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

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
        <div className="detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>
            <Container className="row">
            {/* <h2>Detail Product</h2> */}
            <div className="col-md-5">
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
            <div className="row col-md-7 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <div className="col-md-7 mt-3">
                <h5 className="text-dark fs-4 fw-normal">${product.price}</h5>
                <div className="row mx-0 d-flex justify-content-between pt-3">
                    <div className="col px-0">

                        {
                            product.inStock > 0
                            ? <h6 className="text-success text-uppercase">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger text-uppercase">Out Stock</h6>
                        }
                    </div>
                    <div className="col px-0">
                        <h6 className="text-success text-uppercase">Sold: {product.sold}</h6>
                    </div>
                    </div>
                    <div className="my-2 line-clamp">{product.description}</div>
                    {/* <div className="my-2">{product.content}</div> */}
                    <button 
                        type="button" 
                        className="btn btn-success d-block my-3 px-6 fw-bolder text-uppercase w-100"
                        onClick={() => dispatch(addToCart(product, cart))}
                        >
                        add to bag
                    </button>
                </div>
                <div className="col-md-5 mt-3">
                    <div className="signature-wrapper">
                        <h3 className="signature-title">Only on FreshVeg</h3>
                        <ul className="signature-list">
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/VIETNAMESE_MADE_small_b8nkgy.svg"/><h6>Made in Vietnam</h6></li>
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/NATURAL_INGREDIENTS_small_c2hpks.svg"/><h6>100% Natural Ingredient</h6></li>
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/ORGANIC_QUALITIES_small_uhpxfc.svg"/><h6>100% Organic Qualities</h6></li>
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/cruelty_animal_be5zvx.svg"/><h6>Cruelty Free</h6></li>
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/RECYCLABLE_PACKAGING_small_cdddkt.svg"/><h6>Recyclable Packaging</h6></li>
                            <li className="signature-item"><Image width={70} height={100} objectPosition="50% 30%" src="https://res.cloudinary.com/dnstudio/image/upload/v1648824501/freshveg_media/CARBON_NEUTRAL_Small_i9cl32.svg"/><h6>Carbon Neutral</h6></li>
                        </ul>
                    </div>
                </div>
            </div>
            </Container>
            <Container className="row">
                <div className="col-md-8 mx-auto">
                    <h4 className="product-description">Mô tả sản phẩm</h4>
                    <div className={`product-content ${isReadMore ? "hide-content" : ""}`}>
                        {product.content}
                    </div>
                    <div className="mx-auto">
                        <btn
                        onClick={handleReadMore}
                        type="button" 
                        className="btn btn-outline-success d-block my-3 fw-bolder text-uppercase"
                        >
                            {isReadMore ? "Read More" : "Read Less"}
                        </btn>
                    </div>
                </div>
                <div className="col-md-4">

                   
                </div>
            </Container>
        </div>
    )
}

export async function getServerSideProps({params: {slug}}) {
    
    // console.log(slug)
    
    const res = await getData(`product/item/${slug}`)
    // console.log(res)
    //server side rendering
    return {
      props: {
        product: res.product
      }, // will be passed to the page component as props
    }
  }

export default DetailProduct