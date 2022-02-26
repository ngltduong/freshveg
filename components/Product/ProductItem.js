import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck}) =>{
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state 

    const userLink = () =>{
        return(
            <>
                <div className="col">
                    <Link href={`/products/item/${product.slug}`}>
                        <a className="btn btn-info mr-1 w-100 text-light">View</a>
                    </Link>
                </div>
                <div className="col">
                <button 
                    className="btn btn-success ml-1 w-100 text-light"
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    Buy
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
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ 
                           data: '', 
                           id: product._id, 
                           title: product.title, 
                           type: 'DELETE_PRODUCT' 
                       }]
                    })}
                >
                    Delete
                </button>
                </div>
            </>
        )
    }

    // if(!auth.user) return null

    return (
        <div className="card" style={{width: "18rem"}}>
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
                        <h6 className="text-danger">${product.price}</h6>
                    </div>
                    <div className="col">
                        {
                            product.inStock > 0 
                            ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger">Out Stock</h6>
                        }
                    </div>
                </div>
                <p className="card-text" 
                title={product.description}
                >
                    {product.description}
                </p>

                <div className="row justify-content-between mx-0 mb-4">
                    {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
                </div>
                {/* <div className="footer d-flex">
                    <a href="#" className="btn btn-primary mx-auto">Go somewhere</a>
                </div> */}
            </div>
        </div>
    )
}

export default ProductItem