import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import AddProduct from '../../Admin/AddProduct';
import DeleteProduct from '../../Admin/DeleteProduct';
import UpdateProduct from '../../Admin/UpdateProduct';
import ViewProducts from '../../Admin/ViewProducts';
import './Admin.css';

const AdminDashboard = () => {

    return (
        <div className="adminPane">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="adminRow">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">View Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Add Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Update Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Delete Product</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ViewProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AddProduct />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <UpdateProduct />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <DeleteProduct />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default AdminDashboard;
