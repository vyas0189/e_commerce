import React, { useEffect } from 'react';

import {useStoreState, useStoreActions} from 'easy-peasy'
import {useParams} from 'react-router-dom'

import Image from 'react-bootstrap/Image'
import "./Product.css"

const ProductComponent = () => {

    const { productID } = useParams()
    const getProduct = useStoreActions(actions => actions.products.getProduct)
    const loading = useStoreState(state => state.products.loading)
    const product  = useStoreState(state => state.products.product)


    useEffect(() => {
        getProduct(productID)
    }, [productID])

    return (
        <div>
            {loading ? <h1>Loading...</h1> :
            (<div>
                <h1>{product.name}</h1>
                <Image src = {product.image} fluid rounded/>
                <h1>{product.price}</h1>
                <h1>{product.description}</h1>
            </div>
            )
            }
        </div>
    )
}

export default ProductComponent