import { useStoreState } from 'easy-peasy';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

    const isAuthenticated = useStoreState(state => state.user.isAuthenticated);
    const loading = useStoreState(state => state.user.loading)
    const user = useStoreState(state => state.user.user)

    return (
        <Route
            {...rest}
            render={props => loading ? <h1>Loading</h1> : isAuthenticated && user && user.role === 'admin' ? <Component {...props} /> : <Redirect to={'/login'} />}
        />
    )
}


export default PrivateRouteAdmin;