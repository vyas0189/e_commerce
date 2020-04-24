import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AddToCartButton from '../../components/AddToCartButton';
import "./Products.css";

const Products = () => {

    const { category } = useParams();
    const getProductCategory = useStoreActions(actions => actions.products.getProductCategory)
    const loading = useStoreState(state => state.products.loading)
    const products = useStoreState(state => state.products.products)

    useEffect(() => {
        getProductCategory(category)
    }, [category, getProductCategory])

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
            height: '28rem',
            width: '15.73rem',
        }
    };
    return (
        <div>
            {loading ? <h1>Loading... </h1> :

                <Container style={styles.container}>
                    <h1>{category}</h1>
                    <Row>
                        {products.map((product) => (
                            <Col md='4' lg='3' key={product._id}>
                                <div className="mt-4" />
                                <Card style={styles.cardFormat} >
                                    <Link to={`/product/${product._id}`}> <Card.Img variant="top" style={styles.img} src={product.image} /></Link>
                                    <Card.Body>
                                        <Card.Title><h1 style={styles.h1}>{product.name}</h1></Card.Title>
                                        <Card.Text>
                                            ${product.price.toFixed(2)}
                                        </Card.Text>
                                        <center>
                                            <AddToCartButton productid={product._id} quantity={1} productquantity={product.quantity} />
                                        </center>
                                    </Card.Body>
                                </Card>
                            </Col>


                        ))}
                    </Row>
                </Container>
            }
        </div>

    )
};

export default Products
