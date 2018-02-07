const axios = require('axios');

axios.post('http://localhost:3003/api/order?token=testapi', {
  productName: 'Адресная табличка',
  // count: '1',
  city: 'Ставрополь',
  customerPhone: '89123331212',
  customerName: 'Вася',
  // config: [
  //   { key: 'color', value: 'red', name: 'fasfa' },
  //   { key: 'material', value: 'pvh', name: 'fs' },
  //   { key: 'address', value: 'Ленина 123', name: 'fs' },
  // ]
})
  .then(res => {
    console.log('SUCCESS!');
  }, err => {
    const data = err.response && err.response.data;
    if (data) console.error('ERROR:', JSON.stringify(data.message || data));
    else console.error('ERROR:', err);
  })
