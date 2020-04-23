import axios from "axios";
import { action, thunk } from "easy-peasy";

const addressModel = {
    loading: true,
    validAddress: false,
    error: null,

    validateAddress: thunk(async (action, { address, address2, city, state, zip, }) => {
        action.setError(null);
        action.setLoading(true);

        if (!address2 || address2.length === 0) {
            address2 = 'n/a'
        }
        try {
            const res = await axios.post('/api/address', { address, address2, city, state, zip, })

            if (res.status === 200 && res.data.data.hasOwnProperty('ValidAddressIndicator')) {
                action.setValidAddress(true);
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.setLoading(false);
    }),

    setLoading: action((state, loading) => {
        state.loading = loading;
    }),
    setValidAddress: action((state, valid) => {
        state.validAddress = valid;
    }),
    setError: action((state, error) => {
        state.error = error;
    })
}

export default addressModel;