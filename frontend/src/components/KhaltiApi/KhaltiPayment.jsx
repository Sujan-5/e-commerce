import KhaltiCheckout from 'khalti-checkout-web';
import config from './khaltiConfig';
import './khalti.css';

const KhaltiPayment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  let checkout = new KhaltiCheckout(config);
  // let btn = document.getElementById('payment-button');

  const wholeTotal = orderInfo && orderInfo.totalPrice * 100;

  const handleCheckout = () => {
    console.log('check');
    checkout.show({ amount: wholeTotal });
  };

  return (
    <div className="payContainer">
      <div className="paySummary">
        <h1>Order Summary</h1>
        <div className="paySummaryBox">
          <div>
            <p>Total: </p>
            <span>Rs. {orderInfo && orderInfo.allTotal}</span>
          </div>
          <div>
            <p>Shipping Charges: </p>
            <span>Rs. {orderInfo && orderInfo.shippingCharges}</span>
          </div>
          <div>
            <p>All Total: </p>
            <span>Rs. {orderInfo && orderInfo.totalPrice}</span>
          </div>
          <button id="payment-button" onClick={handleCheckout}>
            Pay - {`Rs. ${orderInfo && orderInfo.totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KhaltiPayment;
