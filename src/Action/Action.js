import { uiActions } from "../store/ui-slice";
import axios from 'axios';
import { cartActions } from "../store/cart-slice";




export const sendCartData = (cart) => {
    return (dispatch) => {

        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending Data..."
        }))

        axios.put("https://cart-60683-default-rtdb.firebaseio.com/cart.json", {
            body: cart
        })

            .then(res => {
                console.log(res.data)
                dispatch(uiActions.showNotification({
                    status: "success",
                    title: "Success...",
                    message: "Data Send Successfully..."
                }))

            })

            .catch(err => {
                console.log(err)
                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Error...",
                    message: "Data Send Failed..."
                }))
            })

    }
}


export const fetchCartData = () => {
    return (dispatch) => {

        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Fetching...",
            message: "Fetching Data..."
        }))

        axios.get("https://cart-60683-default-rtdb.firebaseio.com/cart.json")
            .then((res) => {
                console.log(res.data)
                dispatch(uiActions.showNotification({
                    status: "success",
                    title: "Success...",
                    message: "Data Fetch Successfully..."
                }))
                const cartData=res.data;
                dispatch(cartActions.replaceCart({
                    items: cartData.body?.items || [],
                    totalQuantity: cartData.body?.totalQuantity || 0,
                  }))
            })
            .catch((err) => {
                console.log(err)
                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Error...",
                    message: "Data Fetching Failed..."
                }))
            })

    }
}

// export const fetchCartData = (cartData) => {
//     return async dispatch => {
//         const fetchRequest = async () => {
//             const response = await fetch(
//                 'https://cart-60683-default-rtdb.firebaseio.com/cart.json'
//             );

//             if (!response.ok) {
//                 throw new Error('Fetching cart data failed');
//             }

//             const data = await response.json();
//             return data;
//         };

//         try {
//             const cart = await fetchRequest();
//             if (cart) dispatch(cartActions.replaceCart(cartActions.replaceCart({
//                 items: cartData?.items || [],
//                 totalQuantity: cartData?.totalQuantity || 0,
//             })));
//         } catch (error) {
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error!',
//                     message: 'Fetching cart data failed!',
//                 })
//             );
//         }
//     };
// };