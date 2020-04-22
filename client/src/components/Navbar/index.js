import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import "./Navbar.css";

const NavbarComponent = () => {
    const history = useHistory();
    const logout = useStoreActions(actions => actions.user.logout)
    const loading = useStoreState(state => state.user.loading)
    const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

    const logoutUser = () => {
        logout();
        history.push('/')
    }

    const adminNavbar = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <i onClick={logoutUser} className="nav-link">Logout</i>
                </li>
            </ul>
        )
    }

    const guestNavbar = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i> Category </a>

                    <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                        <Link className="dropdown-item" to='/products/men'>Men</Link>
                        <Link className="dropdown-item" to='/products/women'>Women</Link>
                        <Link className="dropdown-item" to='/products/teen'>Teen</Link>
                        <Link className="dropdown-item" to='/products/kids'>Kids</Link>
                        <Link className="dropdown-item" to='/products/shoes'>Shoes</Link>
                    </div>

                </li>
                <li className="nav-item">
                    <Link to='/cart' className="nav-link">Cart</Link>
                </li>
            </ul>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="/">
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {!loading && isAuthenticated ? adminNavbar() : guestNavbar()}
            </Navbar.Collapse>
        </Navbar >
    )
}

export default NavbarComponent
