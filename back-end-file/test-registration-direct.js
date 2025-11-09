const User = require('./models/User');

async function testRegistration() {
  try {
    console.log('Testing user registration...');
    
    // Test creating a user
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password_here'
    };
    
    const result = await User.create(userData);
    console.log('User created successfully:', result);
    
    // Test finding user by email
    const foundUser = await User.findByEmail('test@example.com');
    console.log('User found:', foundUser);
    
    process.exit(0);
  } catch (error) {
    console.error('Registration test failed:', error.message);
    process.exit(1);
  }
}

testRegistration();