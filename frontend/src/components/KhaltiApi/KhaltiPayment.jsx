import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import { useAlert } from 'react-alert';

const KhaltiPayment = ({ order, cartItems, totalPrice, user }) => {
  const alert = useAlert();

  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_c2096a11f2e14e6890e19eeab87e78c1',
    productIdentity: '1234',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication

        order.orderItems = JSON.stringify(cartItems);
        const ord = {
          ...order,

          paymentInfo: { id: payload.idx, status: 'succeeded' },
          type: 'multipart/form-data',
        };
        console.log(ord);
        try {
          const config = { headers: { 'Content-Type': 'application/json' } };

          const { data } = await axios.post(
            `/api/ord/order/create`,
            ord,
            config
          );
          console.log(data);

          cartItems.forEach((item, index) => {
            if (item.productId === ord.orderItems[0].productId) {
              item.stock -= order.orderItems[0].quantity;

              cartItems.splice(index, 1);
            }
          });

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
    if (user.role === 'admin') {
      alert.error('You are not authorized to order items.');
      return;
    }
    checkout.show({ amount: wholeTotal });
  };

  return (
    <button id="payment-button" onClick={handleCheckout}>
      Pay
    </button>
  );
};

export default KhaltiPayment;
