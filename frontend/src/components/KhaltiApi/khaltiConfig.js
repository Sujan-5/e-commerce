let config = {
  // replace this key with yours
  publicKey: 'test_public_key_c2096a11f2e14e6890e19eeab87e78c1',
  productIdentity: '1234',
  productName: 'Drogon',
  productUrl: 'http://gameofthrones.com/buy/Dragons',
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
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

export default config;
