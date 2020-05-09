import axios from 'axios';
import { action, thunk } from 'easy-peasy';
import { toast } from 'react-toastify';

const userModel = {
    isAuthenticated: false,
    loading: true,
    err: null,
    user: null,

    getUser: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get('/api/user/me');

            if (res.status === 200) {
                action.setAuthenticated(true);
                action.setUser(res.data.data)
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.isLoading(false);
    }),

    login: thunk(async (action, { username, password }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.post('/api/user/login', { username, password });

            if (res.status === 200) {
                action.setAuthenticated(true)
                action.getUser();
                toast.success('Logged in successfully!')
            }
        } catch (error) {
            toast.error('Invalid username or password.')
        }
        action.isLoading(false);
    }),

    register: thunk(async (action, { email, firstName, lastName, address, username, password, city, state, zip, address2, }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.post('/api/user/register', { email, firstName, lastName, address, username, password, city, state, zip, address2, role: 'user' });

            if (res.status === 200) {
                action.setAuthenticated(true);
                action.setUser(res.data.user)
                toast.success('Registered in successfully!')
            }
        } catch (error) {
            toast.error('Invalid Info.')
        }
        action.isLoading(false);
    }),

    logout: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.delete('/api/user/logout');

            if (res.status === 200) {
                action.setAuthenticated(false)
                action.setUser(null);
                toast.success('Logged out successfully!')

            }
        } catch (error) {
            toast.error('Unable to logout.')
        }
        action.isLoading(false);

    }),

    isLoading: action((state, loading) => {
        state.loading = loading;
    }),
    setError: action((state, error) => {
        state.err = error;
    }),
    setAuthenticated: action((state, isAuthenticated) => {
        state.isAuthenticated = isAuthenticated;
    }),

    setUser: action((state, user) => {
        state.user = user;
    }),
}


export default userModel;