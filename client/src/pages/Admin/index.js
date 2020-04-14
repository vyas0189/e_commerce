import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Dashboard from '../Dashboard';

const Admin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const login = useStoreActions(actions => actions.admin.login);
    const isAuthenticated = useStoreState(state => state.admin.isAuthenticated);
    const loading = useStoreState(state => state.admin.loading);

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
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" required autoFocus onChange={(e) => onChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={password} onChange={(e) => onChange(e)} minLength="6" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        )
    )
}

export default Admin
