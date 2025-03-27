// Simple script to test the Open Scripture API
// Run with: node test-scripture-api.js

const testScriptureApi = async () => {
  try {
    console.log('Testing Open Scripture API...');
    
    // Test the random scripture endpoint
    const randomResponse = await fetch('https://openscriptureapi.org/api/scriptures/v1/lds/en/random');
    
    if (!randomResponse.ok) {
      throw new Error(`Random scripture API request failed with status ${randomResponse.status}`);
    }
    
    const randomData = await randomResponse.json();
    console.log('Random Scripture API Response:');
    console.log(JSON.stringify(randomData, null, 2));
    
    // Test a specific scripture endpoint (e.g., John 3:16)
    const specificResponse = await fetch('https://openscriptureapi.org/api/scriptures/v1/lds/en/john/3/16');
    
    if (!specificResponse.ok) {
      throw new Error(`Specific scripture API request failed with status ${specificResponse.status}`);
    }
    
    const specificData = await specificResponse.json();
    console.log('\nSpecific Scripture API Response (John 3:16):');
    console.log(JSON.stringify(specificData, null, 2));
    
    console.log('\nAPI testing completed successfully!');
  } catch (error) {
    console.error('Error testing scripture API:', error);
  }
};

// Execute the test function
testScriptureApi();
