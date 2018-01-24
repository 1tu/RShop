const axios = require('axios');

axios.post('http://localhost:3003/api/order?token=testapi', {
  productName: 'Печь',
  shopDomain: 'reklamnoe-agentstvo',
  customerPhone: '89123331212',
})
  .then(res => {
    console.log('RES:', res);
  }, err => {
    console.error('ERROR:', err, err.response && err.response.data, err.host + ':' + err.port);
  })
