import axios from "axios";
import { action, thunk } from "easy-peasy";

const productModel = {
    loading: false,
    err: null,
    products: [],
    cart: [],
    product: null,

    getAllProducts: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get('/product');

            if (res.status === 200) {
                action.setProducts(res.data.products);
            }
        } catch (error) {
            action.setError(error.response.data.message)
        }
        action.isLoading(false);
    }),

    getProduct: thunk(async (action, { productID }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get(`/product/${productID}`);

            if (res.status === 200) {
                action.setProduct(res.data.product);
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.isLoading(false);
    }),
    getProductCategory: thunk(async (action, category) => {
        action.setError(null);
        action.isLoading(true);

        try {
            console.log(category);

            const res = await axios.get(`/product/category/${category}`);
            if (res.status === 200) {
                console.table(res.data.product)
                action.setProducts(res.data.product);
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.isLoading(false);
    }),

    addToCart: action((state, item) => {
        state.cart = [...state.cart, item]
    }),
    removeItemFromCart: action((state, id) => {
        state.cart = state.cart.filter(item => item._id !== id)
    }),

    isLoading: action((state, loading) => {
        state.loading = loading;
    }),
    setError: action((state, error) => {
        state.err = error;
    }),
    setProducts: action((state, products) => {
        state.products = products;
    }),

    setProduct: action((state, product) => {
        state.product = product
    })
}

export default productModel