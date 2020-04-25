import axios from "axios";
import { action, thunk } from "easy-peasy";
import { toast } from "react-toastify";

const productModel = {
    loading: true,
    err: null,
    products: [],
    cart: [],
    product: [],

    getAllProducts: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get('/api/product');

            if (res.status === 200) {
                action.setProducts(res.data.products);
            }
        } catch (error) {
            action.setError(error.response.data.message)
        }
        action.isLoading(false);
    }),

    getProduct: thunk(async (action, productID) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get(`/api/product/${productID}`);

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
            const res = await axios.get(`/api/product/category/${category}`);
            if (res.status === 200) {
                action.setProducts(res.data.product);
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.isLoading(false);
    }),

    addProduct: thunk(async (action, { name, productType, price, image, quantity, description }) => {
        action.setError(null);
        action.isLoading(true);
        try {
            const res = await axios.post('/api/product', { name, productType, price, image, quantity, description });

            if (res.status === 200) {
                action.getAllProducts();
                toast.success('Product Added.')
            }
        } catch (error) {
            toast.error('Unable to add product')
        }
        action.isLoading(false);

    }),
    updateProduct: thunk(async (action, { productID, name, productType, price, image, quantity, description }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.put('/api/product', { productID, name, productType, price, image, quantity, description });

            if (res.status === 200) {
                action.getAllProducts();
                toast.success('Product Updated.')

            }
        } catch (error) {
            toast.error('Unable to update product')
        }
        action.isLoading(false);

    }),

    deleteProduct: thunk(async (action, productID) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.delete(`/api/product/${productID}`);

            if (res.status === 200) {
                action.getAllProducts();
                toast.success('Product Deleted.')

            }
        } catch (error) {
            toast.error('Unable to update deleted')

        }
        action.isLoading(false);
    }),
    getCart: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.get('/api/user/cart');

            if (res.status === 200) {
                action.setCart(res.data.cart);
            }
        } catch (error) {
            action.setError(error.response.data.message);
        }
        action.isLoading(false);
    }),

    addToCart: thunk(async (action, { productID, quantity }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.post('/api/user/addProductToCart', { productID, quantity });

            if (res.status === 200) {
                action.getCart();
                toast.success('Added to Cart!')
            }
        } catch (error) {
            toast.error('Unable to add to cart.')
        }
        action.isLoading(false);
    }),

    updateCart: thunk(async (action, { productID, quantity }) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.put('/api/user/updateFromCart', { productID, quantity });

            if (res.status === 200) {
                toast.success('Cart Updated')
                action.getCart();
            }
        } catch (error) {
            toast.error('Unable to update to cart.')
        }

        action.isLoading(false);
    }),

    checkout: thunk(async (action) => {
        action.setError(null);
        action.isLoading(true);

        try {
            const res = await axios.post('/api/user/checkout');

            if (res.status === 200) {
                toast.success('Item(s) checked out.')

                action.getCart();
            }
        } catch (error) {
            toast.error('Unable checkout.');
        }

        action.isLoading(false);
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
        state.product = product;
    }),
    setCart: action((state, cart) => {
        state.cart = cart;
    })

}

export default productModel