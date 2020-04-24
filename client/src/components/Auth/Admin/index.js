import { useStoreActions, useStoreState } from 'easy-peasy';
import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Dashboard from '../../../pages/Dashboard';
import './Admin.css';
const AdminLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const login = useStoreActions(actions => actions.user.login);
    const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
    const loading = useStoreState(state => state.user.loading);

    const { username, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        const userLogin = { username, password }

        login(userLogin);
        setFormData({ username: '', password: '' })
    };
    return (
        loading ? <h1>Loading...</h1> : (isAuthenticated ? <Dashboard /> :
            <MDBContainer className="adminLoginContainer">
                <MDBCard className="adminLoginCard">
                    <MDBRow className="adminLogin">
                        <MDBCol md="6">
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <p className="h5 text-center mb-4">Admin Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Username" icon="user" group type="text" validate error="wrong"
                                        success="right" name="username" onChange={(e) => onChange(e)} required />
                                    <MDBInput label="Type your password" icon="lock" group type="password" validate name="password" onChange={(e) => onChange(e)} required />
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit">Login</MDBBtn>
                                </div>
                            </Form>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        )
    )
}

export default AdminLogin;