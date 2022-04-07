import Head from "next/head"
import {useRouter} from 'next/router'
import {useState, useContext, useEffect} from 'react'
import { DataContext } from "../../../store/GlobalState"
import { imageUpload } from '../../../utils/imageUpload'
import { postData, getData, putData } from "../../../utils/fetchData"
import { StringToSlug } from "../../../utils/stringToSlug"
import styles from '../ProductManager.module.css'
import { Wrapper } from "../../../styles/Global.style"

const ProductsManager = () => {
    const initialState = {
        product_id: '',
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: '',
    }
    const [product, setProduct] = useState(initialState)
    const {product_id, title, price, inStock, description, content, category} = product
    
     const [slug, setSlug] = useState('')

    const [images, setImages] = useState([])

    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state

    const router = useRouter()
    console.log(router)

    const productIdGetFromQuery = router.query.id
    console.log(productIdGetFromQuery)
    const [onEdit, setOnEdit] = useState(false)

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product,[name]: value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadImage = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]
        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})
        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'The largest image size is 1mb'

            if(
                file.type !== 'images/jpeg' 
                && file.type !== 'image/png' 
                && file.type !== 'image/jpg'
            )
            return err = 'Image format is incorrect'

            num += 1
            if(num <= 5) newImages.push(file)
            return newImages
        })
        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        setImages([...images, ...newImages])
    }

    const handleDeleteItem = idx => {
        const newArr = [...images]
        newArr.splice(idx, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin')
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid'}})

        if(!product_id || !title || !price || !inStock || 
            !description || !content || category === 'all' || images.length === 0 )
            return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})
        

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)
        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)
        let res
        if(onEdit){
            res = await putData(`product/${productIdGetFromQuery}`, {...product, slug, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, slug, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }


        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }

    useEffect(()=> {
        if(productIdGetFromQuery){
            setOnEdit(true)
            getData(`product/${productIdGetFromQuery}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else{
                setProduct(initialState)
                setImages([])
        }
    },[productIdGetFromQuery])

    useEffect(()=> {
        
        let newslug = StringToSlug(title)
        if(product_id && title){
            newslug = newslug + '-' + product_id
        }
        setSlug(newslug)
    },[title, product_id])

    // const handleGenerateSlug = (e) => {
    //     const {name, value} = e.target
    //     // setProduct({...product,[name]: value})
    //     console.log(e.target)
    //     let generateSlug = StringToSlug(value)
    //     setSlug({[name]: generateSlug})
    //     dispatch({type: 'NOTIFY', payload: {}})
    // }

    return(
        <Wrapper>
            <div className="products_manager">
            <Head>
                <title>Product Manager</title>
            </Head>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <input type="text" className="d-block my-4 w-100 p-2"
                    placeholder="Product ID" name="product_id" value={product_id}
                    onChange={handleChangeInput}/>

                    <input type="text" className="d-block my-4 w-100 p-2"
                    placeholder="Title" name="title" value={title}
                    onChange={handleChangeInput}/>

                    <input type="text" className="d-block my-4 w-100 p-2"
                    placeholder="Slug" name="slug" value={slug}
                     disabled={true}/>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="d-block w-100 p-2"
                            placeholder="Price" name="price" value={price}
                            onChange={handleChangeInput}/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="inStock">In Stock</label>
                            <input type="number" className="d-block w-100 p-2"
                            placeholder="inStock" name="inStock" value={inStock}
                            onChange={handleChangeInput}/>
                        </div>
                    </div>
                    <textarea name="description" id="description" cols="30" rows="4"
                    placeholder="Description" onChange={handleChangeInput} value={description}
                    className="d-block my-4 w-100 p-2"
                    />

                    <textarea name="content" id="content" cols="30" rows="6"
                    placeholder="Content" onChange={handleChangeInput} value={content}
                    className="d-block my-4 w-100 p-2"
                    />
                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput}>
                            <option value="all">All Products</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-info my-2 px-4 mx-0">
                        {/* {onEdit ? 'Update' : 'Create'} */}
                        Update
                    </button>
                </div>
                <div className="col-md-6 my-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                        </div>
                        <div className="custom-file border rounded">
                            <input type="file" className="custom-file-input"
                            onChange={handleUploadImage} multiple accept="image/*"
                            />
                        </div>
                    </div>
                    <div className="row img-up mx-0">
                        {
                            images.map((img, idx) => (
                                <div key={idx} className="file_img">
                                    <img
                                     src={
                                        img.url 
                                        ? img.url 
                                        : URL.createObjectURL(img)} 
                                    alt=""
                                    className="img-thumbnail rounded"
                                    />
                                    <span onClick={() => handleDeleteItem(idx)}>X</span>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </form>
        </div>
        </Wrapper>
        
    )
}

export default ProductsManager