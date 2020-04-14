import axios from 'axios';
import { action, thunk } from 'easy-peasy';

const adminModel = {
    isAuthenticated: false,
    loading: false,
    err: null,

    getCurrentAdmin: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get('/api/user/me');

            if (res.status === 200) {
                action.setAuthenticated(true)
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
            }
        } catch (error) {
            action.setError(error.response.data.message);
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
            }
        } catch (error) {
            action.setError(error.response.data.message);
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
}


export default adminModel;