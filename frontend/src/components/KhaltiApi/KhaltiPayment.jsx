import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';

const KhaltiPayment = ({ order }) => {
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
        console.log(ord);
        try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          const { data } = await axios.post(
            `/api/ord/order/create`,
            ord,
            config
          );
          console.log(data);
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

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  let checkout = new KhaltiCheckout(config);
  // let btn = document.getElementById('payment-button');

  // const wholeTotal = orderInfo && orderInfo.totalPrice * 100;

  const handleCheckout = () => {
    console.log('check');
    checkout.show({ amount: 1000 });
  };

  return (
    <button id="payment-button" onClick={handleCheckout}>
      Pay - {`Rs. ${orderInfo && orderInfo.totalPrice}`}
    </button>
  );
};

export default KhaltiPayment;
