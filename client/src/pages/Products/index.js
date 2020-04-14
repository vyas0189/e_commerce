import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Products = () => {

    const { category } = useParams();
    const getProductCategory = useStoreActions(actions => actions.products.getProductCategory)
    const loading = useStoreState(state => state.products.loading)
    const products = useStoreState(state => state.products.products)
    const cart = useStoreState(state => state.products.cart);

    useEffect(() => {
        getProductCategory(category)
    }, [category])

    const productsCart = () => {

    }
    return (
        <div>
            {loading ? <h1>Loading...</h1> :
                (
                    (
                        products.map(product => <h1>{product.name}</h1>)
                    )
                )
            }
        </div>
    )
}

export default Products
