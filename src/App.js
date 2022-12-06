import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from "./Action/Action"

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification)


  /////////////// API Call Inside the Components//////////////

  // useEffect(() => {
  //   // fetch("https://cart-60683-default-rtdb.firebaseio.com/cart.json",{
  //   //   method:"PUT",
  //   //   body:JSON.stringify(cart),
  //   // })

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   dispatch(uiActions.showNotification({
  //     status: "pending",
  //     title: "Sending...",
  //     message: "Sending Data..."
  //   }))

  //   axios.put("https://cart-60683-default-rtdb.firebaseio.com/cart.json", {
  //     body: cart
  //   }).then(res => {
  //     console.log(res.data)
  //     dispatch(uiActions.showNotification({
  //       status: "success",
  //       title: "Success...",
  //       message: "Data Send Successfully..."
  //     }))

  //   })

  //     .catch(err => {
  //       console.log(err)
  //       dispatch(uiActions.showNotification({
  //         status: "error",
  //         title: "Error...",
  //         message: "Data Send Failed..."
  //       }))
  //     })

  // }, [cart, dispatch])



  ///////////Fetching of data ////////////////

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])



  ////////////// Using Thunk ////////////// Created Actions Folder for dispatching a function

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {

      dispatch(sendCartData(cart));
    }


  }, [cart, dispatch])


  return (
    <>
      {notification &&
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

