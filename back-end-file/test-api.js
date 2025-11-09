const fetch = require('node-fetch');

async function testPurchaseAPI() {
  try {
    console.log('Testing purchase API endpoint...');
    
    const purchaseData = {
      productId: 1,
      productName: "Test Product",
      productPrice: 99.99,
      customerName: "John Doe",
      customerEmail: "john@test.com",
      customerAddress: "123 Test St",
      customerPhone: "555-1234"
    };
    
    const response = await fetch('http://localhost:5000/api/purchases/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData)
    });
    
    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', result);
    
    if (response.ok) {
      console.log('API test successful!');
    } else {
      console.log('API test failed with status:', response.status);
    }
  } catch (error) {
    console.error('API test error:', error);
  }
}

testPurchaseAPI();