import styled from "styled-components"
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const Price = styled.span`
    display: inline-block;
    border-left: 1px solid #fff;
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 0 0 20%;
    padding: 0px 16px;

`

const AddToCart = styled.span`
    display: inline-block;
    text-transform: uppercase;
    width: 100%;
    flex: 0 0 80%;
`

const ProductItem = ({product, handleCheck}) =>{
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state 

    // const handleAddToCart = (e) => {
    //     e.stopPropogation()
    //     dispatch(addToCart(product, cart)
    // }

    const userLink = () =>{
        return(
            <>
                {/* <div className="col">
                    <Link href={`/products/item/${product.slug}`}>
                        <a className="btn btn-info mr-1 w-100 text-light">View</a>
                    </Link>

                </div> */}
                {/* <div className="col">
                <button 
                    className="btn btn-success ml-1 w-100 text-light"
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    Buy
                </button>
                </div> */}
                <div className="w-100">
                <button 
                    className="btn btn-success ml-1 w-100 text-light flex"
                    disabled={product.inStock === 0 ? true : false}
                    onClick={(e) => {
                        e.preventDefault()
                        // e.stopPropagation()
                        // e.nativeEvent.stopImmediatePropagation()
                        dispatch(addToCart(product, cart))
                    }}
                >
                    {
                        product.inStock > 0 
                        ? <AddToCart>ADD TO CART</AddToCart>
                        : <AddToCart>OUT STOCK</AddToCart>

                    }
                    
                    <Price>${product.price}</Price>
                </button>
                </div>
            </>
        )
    }
    const adminLink = () =>{
        return(
            <>
                <div className="col">
                    <Link href={`/create/${product._id}/edit`}>
                        <a className="btn btn-info mr-1 w-100 text-light">Edit</a>
                    </Link>
                </div>
                <div className="col">
                <button 
                    className="btn btn-danger ml-1 w-100 text-light"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={(e) => {
                        e.preventDefault()
                        
                        dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ 
                           data: '', 
                           id: product._id, 
                           title: product.title, 
                           type: 'DELETE_PRODUCT' 
                       }]
                    })}}
                >
                    Delete
                </button>
                </div>
            </>
        )
    }

    // if(!auth.user) return null

    return (
        <div className="card" >
            <Link href={`/products/item/${product.slug}`}>
                <a style={{height: '500px'}}>
                    {
                        auth.user && auth.user.role === 'admin' &&
                        <input type="checkbox" checked={product.checked}
                        className="position-absolute"
                        style={{height: '20px', weight: '20px'}}
                        onChange={() => handleCheck(product._id)}
                        />
                    }
                    <img src={product.images[0].url} className="card-img-top" alt={product.images[0].url} />
                    <div className="card-body">
                        <h5 className="card-title text-capitalize" title={product.title}>{product.title}</h5>
                        <div className="row justify-content-between mx-0">
                            <div className="col">
                                <h6 className="text-dark">Sold: {product.sold}</h6>
                            </div>
                            <div className="col">
                                {
                                    product.inStock > 0 
                                    ? <h6 className="text-dark">In Stock: {product.inStock}</h6>
                                    : <h6 className="text-danger">Out Stock</h6>
                                }
                            </div>
                        </div>
                        <p className="card-text" 
                        title={product.description}
                        >
                            {product.description}
                        </p>

                        {/* <div className="row justify-content-between mx-0 mb-4">
                            {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
                        </div> */}
                        {/* <div className="footer d-flex">
                            <a href="#" className="btn btn-primary mx-auto">Go somewhere</a>
                        </div> */}
                    </div>
                    <div className="row justify-content-between mx-0 mb-4">
                        {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
                    </div> 
                </a>
            </Link>
        </div>
    )
}

export default ProductItem