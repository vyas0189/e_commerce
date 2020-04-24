import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import "./Product.css";
import AddToCartButton from '../../components/AddToCartButton';

const ProductComponent = () => {

    const { productID } = useParams()
    const getProduct = useStoreActions(actions => actions.products.getProduct)
    const loading = useStoreState(state => state.products.loading)
    const product = useStoreState(state => state.products.product)


    useEffect(() => {
        getProduct(productID)
    }, [productID])

    const styles = {
        h1: {
            fontSize: '15px',
            color: 'black'
        },
        h2: {
            fontSize: '30px',
            color: 'black'
        },
        img: {
            height: '250px',
            width: '250px',
            objectFit: 'cover'
        }
    }

    return (
    
        <div class="container mt-5">
            <h3 class="text-center font-weight-bold mb-5">Product Details</h3>
            <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row h-100 d-flex align-items-center">
                                    <div class="col-lg-6">
                                    <center></center><h1 style={styles.h2}>{product.name}</h1>
                                    <p class="text-muted font-weight-light  mb-5">{product.description}</p>
                                    <div class="d-flex justify-content-between">
                                        <AddToCartButton productid={product._id} quantity={1} productquantity={product.quantity} /> 
                                        <div class="text-center">
                                            <h1 style={styles.h1}>${product.price}</h1>
                  	                        <small class="grey-text">No shipping fee</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                <img src={product.image} class="img-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent