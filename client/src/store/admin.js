import { thunk } from 'easy-peasy';

const adminModel = {
    isAuthenticated: false,
    loading: false,
    admin: null,

    login: thunk((action, { username, password }) => {
        
    }),

}