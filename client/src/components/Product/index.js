import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import "./Product.css";

const ProductComponent = () => {

    const { productID } = useParams()
    const getProduct = useStoreActions(actions => actions.products.getProduct)
    const loading = useStoreState(state => state.products.loading)
    const product = useStoreState(state => state.products.product)


    useEffect(() => {
        getProduct(productID)
    }, [productID])

    return (
        <div>
            {loading ? <h1>Loading...</h1> :
                (<div>
                    <div class="imageDiv">
                        <Image class="test" src={product.image} fluid rounded />
                    </div>
                    <div class="second">
                        <h1 id="nameDisplay">{product.name}</h1>
                        <h1 id="priceDisplay">${product.price}</h1>
                    </div>
                    <br /><br /><br />
                    <hr></hr>
                    <h1 id="descriptionDisplay"><br /><br />{product.description}</h1>
                </div>
                )
            }
        </div>
    )
}

export default ProductComponent