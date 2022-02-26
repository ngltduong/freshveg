import Head from 'next/head'
import {useRouter} from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { getData } from '../../utils/fetchData'
import ProductItem from '../../components/Product/ProductItem'
import filterSearch from '../../utils/filterSearch'
import Filter from '../../components/Filter'

const Product = (props) =>{
  const [products, setProducts] = useState(props.products)
  const [isChecked, setIsChecked] = useState(false)
  const [page, setPage] = useState(1)

  const { state, dispatch} = useContext(DataContext)
  const { auth } = state
 
  const router = useRouter()

  useEffect(()=> {
    setProducts(props.products)
  }, [props.products])

  useEffect(()=> {
    if(Object.keys(router.query).length === 0) setPage(1)
    
  },[router.query])

  const handleCheck = id => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckAll = () => {
    products.forEach(product => product.checked = !isChecked)
    setProducts([...products])
    setIsChecked(!isChecked)
  }

  const handleDeleteAllItem = () => {
    const deleteArr = [] 
    products.forEach(product => {
      if(product.checked){
        deleteArr.push({
          data: '', 
          id: product._id, 
          title: 'Delete all selected products?', 
          type: 'DELETE_PRODUCT' 
        })
      }
    })
    dispatch({
      type: 'ADD_MODAL',
      payload: deleteArr
    })
  }

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({router, page: page+1})
  }

  return (
    <div className="product-page">
      
      <Head>
        <title>Product Page</title>
      </Head>

      <Filter state={state}/>

      {
          auth.user && auth.user.role === 'admin' &&
          <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckAll}
            style={{width: '25px', height: '25px', transform: 'translateY(8px)'}}
            />
            <button className="btn btn-danger ml-2"
             data-bs-toggle="modal" data-bs-target="#exampleModal"
             onClick={handleDeleteAllItem}
            >
              DELETE ALL
            </button>
          </div>
      }

      <div className="product">
        
        {
          products.length === 0
          ? <h2>No Products</h2>
          : products.map(product => (
            <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
          ))
        }
      </div>
      {
        props.result < page * 3 ? "" 
        : <button 
        className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadMore}
        >
          Load more</button>
      }
    </div>
  )
}

export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(`product?limit=${page*4}&category=${category}&sort=${sort}&title=${search}`)
  // console.log(res)
  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
      page
    }, // will be passed to the page component as props
  }
}

export default Product