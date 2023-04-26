import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KhaltiPayment = ({ order, cartItems, totalPrice }) => {
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_c2096a11f2e14e6890e19eeab87e78c1',
    productIdentity: '1234',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        const ord = {
          ...order,
          paymentInfo: { id: payload.idx, status: 'succeed' },
        };

        try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          order.orderItems = JSON.stringify(cartItems);
          const { data } = await axios.post(
            `/api/ord/order/create`,
            order,
            config
          );

          //Update stock and remove item from cart
          console.log('Updating stock and removing item from cart');
          console.log('cartItems before update: ', cartItems);
          console.log('order.orderItems[0]: ', order.orderItems[0]);

          cartItems.forEach((item, index) => {
            if (item.productId === ord.orderItems[0].productId) {
              console.log('item before update: ', item);
              console.log(
                'quantity to subtract: ',
                order.orderItems[0].quantity
              );
              item.stock -= order.orderItems[0].quantity;
              console.log('item after update: ', item);
              // const index = cartItems.findIndex(
              //   (cartItem) => cartItem.productId === item.productId
              // );
              cartItems.splice(index, 1);
            }
          });
          console.log('cartItems after update: ', cartItems);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          // redirect to success page
          window.location.href = '/order/success';
        } catch (error) {
          console.log(error);
        }
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      },
    },
    paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING'],
  };

  // const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  let checkout = new KhaltiCheckout(config);
  // let btn = document.getElementById('payment-button');

  const wholeTotal = totalPrice * 100;

  const handleCheckout = () => {
    checkout.show({ amount: wholeTotal });
  };

  return (
    <button id="payment-button" onClick={handleCheckout}>
      Pay
    </button>
  );
};

export default KhaltiPayment;
