import './Pagination.css'

import React, { useEffect, useState } from 'react'

const Pagination = () => {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)


    const fetchProducts = async () => {

        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);

        const data = await res.json();

        console.log(data)
        if (data && data.products) {
            setProducts(data.products)
            setTotalPages(Math.ceil(data.total / 10))
        }

    }

    useEffect(() => {
        fetchProducts();
    }, [page])

    const handlePage = (selectedPage) => {

        if (selectedPage >= 1 && selectedPage <= totalPages)
            setPage(selectedPage)
    }

    return (
        <div className='container'>
            <span> Pagination </span>
            {
                products?.length > 0 && <div className='products'>

                    {
                        products?.map((prod) => (
                            <span className='products_single' key={prod.id}>
                                <img src={prod.thumbnail} alt={prod.title} />
                                <span>{prod.title}</span>
                            </span>
                        ))
                    }
                </div>
            }


            {products?.length > 0 && <div className='pagination'>
                <span className={page > 1 ? '' : 'pagination_disabled'} onClick={() => handlePage(page - 1)}>⇤</span>
                {[...Array(totalPages)].map((_, i) => {
                    return <span
                        className={page === i + 1 ? 'pagination_selected' : ''}
                        onClick={() => handlePage(i + 1)} key={i}>
                        {i + 1}
                    </span>
                })}
                <span className={page < totalPages ? '' : 'pagination_disabled'} onClick={() => handlePage(page + 1)}>⇥</span>
            </div>}
        </div>
    )
}

export default Pagination
