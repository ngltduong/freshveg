import {useRouter} from 'next/router'
import React, {useState, useEffect} from 'react'
import {getData} from '../../utils/fetchData'
import filterSearch from '../../utils/filterSearch'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Filter({state}) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')

    const {categories} = state
    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.innerHTML)
        filterSearch({router, category: e.target.getAttribute('data-filter')})
    }

    const handleSort = (e) => {
        // console.log(e.target.getAttribute('data-sort') )
        setSort(e.target.innerHTML)
        filterSearch({router, sort: e.target.getAttribute('data-sort')})
    }

    // const handleFilter = (e) => {

    // }
    console.log(category)

    useEffect(()=> {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (

        <div className="input-group">
            <form autoComplete="off" className="mt-2 w-100 px-0">
                <input type="text" className="form-control" list="title_product"
                 value={search.toLowerCase()} onChange={e => setSearch(e.target.value)}
                />
                {/* <datalist id="title_product">
                    <option value="name">Title Name</option>
                </datalist> */}

                <button className="position-absolute btn btn-info" type="submit"
                style={{top: 0, right: 0, visibility: 'hidden'}}
                >
                    Search
                </button>
            </form>
            <div className="sort-group input-group-prepend row px-0 mt-2">
                <div className="col-md-6 col-sm-6 mt-sm-3">
                    {/* <select className="custom-select text-capitalize"
                    value={category} onChange={handleCategory}
                    >
                        <option value="all">All Products</option>
                        {
                            categories.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))
                        }
                    </select> */}
                    <div className="sort-selected"><ArrowDropDownIcon/> {category ? category : 'All Products'}
                        <ul className="sort-list text-capitalize"
                        // value={sort} onChange={handleSort}
                        >
                                <li className="sort-item" key="filter01" data-filter="all" onClick={handleCategory}>All Products</li>
                            {   
                                 categories.map(item => (
                                    // <option key={item._id} value={item._id}>{item.name}</option>
                                    <li className="sort-item" key={item._id} data-filter={item._id} onClick={handleCategory}>{item.name}</li>
                                ))
                            }
                           

                        </ul>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 mt-sm-3">
                    <div className="sort-selected"><ArrowDropDownIcon/> {sort ? sort : 'Filter'}
                    
                        <ul className="sort-list text-capitalize"
                        // value={sort} onChange={handleSort}
                        >
                            <li className="sort-item" data-sort="-createdAt" onClick={handleSort}>Newest</li>
                            <li className="sort-item" data-sort="oldest" onClick={handleSort}>Oldest</li>
                            <li className="sort-item" data-sort="-sold" onClick={handleSort}>Best sales</li>
                            <li className="sort-item" data-sort="-price" onClick={handleSort}>Price: High-Low</li>
                            <li className="sort-item" data-sort="price" onClick={handleSort}>Price: Low-High</li>

                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="input-group-prepend  col-md-2 px-0 mt-2">
                <div className="sort-selected"><ArrowDropDownIcon/> {sort ? sort : 'Filter'}
                
                    <ul className="sort-list text-capitalize"
                    // value={sort} onChange={handleSort}
                    >
                        <li className="sort-item" data-sort="-createdAt" onClick={handleSort}>Newest</li>
                        <li className="sort-item" data-sort="oldest" onClick={handleSort}>Oldest</li>
                        <li className="sort-item" data-sort="-sold" onClick={handleSort}>Best sales</li>
                        <li className="sort-item" data-sort="-price" onClick={handleSort}>Price: High-Low</li>
                        <li className="sort-item" data-sort="price" onClick={handleSort}>Price: Low-High</li>

                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default Filter