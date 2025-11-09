// Test if frontend can connect to backend
async function testConnection() {
  try {
    console.log('Testing connection to backend...');
    
    const response = await fetch('http://localhost:5000/');
    console.log('Backend connection test - Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Backend response:', data);
      console.log('Connection successful!');
    } else {
      console.error('Connection failed with status:', response.status);
    }
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();