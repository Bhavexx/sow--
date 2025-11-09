// Simulate the frontend purchase request
async function testFrontendRequest() {
  try {
    console.log('Testing frontend purchase request...');
    
    // This is the same data structure that the frontend sends
    const purchaseData = {
      productId: 1,
      productName: "Apple MacBook Air M2",
      productPrice: 95000,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerAddress: "123 Main St",
      customerPhone: "555-1234"
    };

    console.log('Sending data:', purchaseData);
    
    // Send request to backend
    const response = await fetch('http://localhost:5000/api/purchases/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData)
    });

    console.log('Response status:', response.status);
    console.log('Response ok?', response.ok);
    
    const result = await response.json();
    console.log('Response data:', result);
    
    if (response.ok) {
      console.log('SUCCESS: Purchase recorded successfully!');
    } else {
      console.log('ERROR: Purchase failed with message:', result.message);
    }
  } catch (error) {
    console.error('CATCH ERROR:', error);
  }
}

testFrontendRequest();