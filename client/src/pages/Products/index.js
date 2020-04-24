import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AddToCartButton from '../../components/AddToCartButton';

const Products = () => {

    const { category } = useParams();
    const getProductCategory = useStoreActions(actions => actions.products.getProductCategory)
    const loading = useStoreState(state => state.products.loading)
    const products = useStoreState(state => state.products.products)

    useEffect(() => {
        getProductCategory(category)
    }, [category])

    const styles = {
        h1: {
            fontSize: '15px',
            color: 'black'
        },
        container: {
            paddingTop: '120px',
            paddingBottom: '120px',
        },
        img: {
            height: '250px',
            width: '250px',
            objectFit: 'cover'
        },
        cardFormat: {
            height: '28.3rem',
            width: '15.77rem'
        }
    };

    return (
        <div>
            {loading ? <h1>Loading... </h1> :
                <Container style={styles.container}>
                    {products.length < 0 ? <h1>No Products</h1> : (
                        <Row>
                            {products.map((product, index) => (
                                <Col md='4' lg='3' key={index} style={{ marginBottom: '1.2rem' }}>
                                    <Card style={styles.cardFormat} >
                                        <Card.Img variant="top" style={styles.img} src={product.image} />
                                        <Card.Body>
                                            <Card.Title><h1 style={styles.h1}>{product.name}</h1></Card.Title>
                                            <Card.Text>
                                                ${product.price.toFixed(2)}
                                            </Card.Text>
                                            <div>
                                                <AddToCartButton productID={product._id} quantity={1} productQuantity={product.quantity} />
                                                <Link to={`/product/${product._id}`}>Details</Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    )
                    }
                </Container>
            }
        </div>
    )
};

export default Products
