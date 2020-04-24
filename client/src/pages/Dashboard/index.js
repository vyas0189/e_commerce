import { useStoreState } from 'easy-peasy';
import React from 'react';
import AdminDashboard from '../../components/Dashboard/Admin';
import Home from '../Home';

const Dashboard = () => {

    const loading = useStoreState(state => state.user.loading);
    const user = useStoreState(state => state.user.user);

    return (
        <div>
            {loading || !user ? <h1>Loading...</h1> : (
                !loading && user.role === 'admin' ? <AdminDashboard /> :
                    !loading && user.role === 'user' ? <Home /> : null
            )}
        </div>
    )
}

export default Dashboard
