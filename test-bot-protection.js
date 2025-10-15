/**
 * Test script for bot protection system
 * Run with: node test-bot-protection.js
 * 
 * This script tests various scenarios to ensure the bot protection is working correctly.
 * Make sure your development server is running on localhost:3000
 */

const API_URL = 'http://localhost:3000/api/contact';

// Test cases
const testCases = [
  // Legitimate submissions (should succeed)
  {
    name: 'Legitimate User',
    email: 'user@gmail.com',
    message: 'Hello, I am interested in working with you. This is a legitimate message with sufficient content.',
    company: '', // Honeypot should be empty
    expectedStatus: 200,
    description: 'Legitimate submission with valid email and content'
  },
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    message: 'I would like to discuss a potential collaboration opportunity. Please let me know when you are available.',
    company: '',
    expectedStatus: 200,
    description: 'Another legitimate submission'
  },

  // Honeypot tests (should return success but not send email)
  {
    name: 'Bot User',
    email: 'bot@example.com',
    message: 'This is a bot submission',
    company: 'Some Company', // Honeypot filled - should be detected as bot
    expectedStatus: 200,
    description: 'Bot with honeypot field filled (should return success but not send email)'
  },

  // Suspicious email domains (should be blocked)
  {
    name: 'Test User',
    email: 'test@tempmail.com',
    message: 'This should be blocked due to suspicious domain',
    company: '',
    expectedStatus: 400,
    description: 'Suspicious email domain (tempmail.com)'
  },
  {
    name: 'Test User',
    email: 'test@10minutemail.com',
    message: 'This should be blocked due to suspicious domain',
    company: '',
    expectedStatus: 400,
    description: 'Suspicious email domain (10minutemail.com)'
  },
  {
    name: 'Test User',
    email: 'test@temp-domain.com',
    message: 'This should be blocked due to domain containing temp',
    company: '',
    expectedStatus: 400,
    description: 'Domain containing suspicious keyword (temp)'
  },
  {
    name: 'Test User',
    email: 'test@abc.xyz',
    message: 'This should be blocked due to .xyz domain',
    company: '',
    expectedStatus: 400,
    description: '.xyz domain should be blocked'
  },

  // Bot pattern detection (should be blocked)
  {
    name: 'test',
    email: 'test@gmail.com',
    message: 'This should be blocked due to bot keyword in name',
    company: '',
    expectedStatus: 400,
    description: 'Bot keyword in name (test)'
  },
  {
    name: 'John',
    email: 'hilton15@gmail.com',
    message: 'This should be blocked due to email pattern',
    company: '',
    expectedStatus: 400,
    description: 'Email pattern with name + numbers'
  },
  {
    name: 'John',
    email: '15hilton@gmail.com',
    message: 'This should be blocked due to email pattern',
    company: '',
    expectedStatus: 400,
    description: 'Email pattern with numbers + name'
  },
  {
    name: 'John',
    email: 'ab123@gmail.com',
    message: 'This should be blocked due to short name with many digits',
    company: '',
    expectedStatus: 400,
    description: 'Short name with many digits pattern'
  },

  // Content validation (should be blocked)
  {
    name: 'A',
    email: 'user@gmail.com',
    message: 'This should be blocked due to name too short',
    company: '',
    expectedStatus: 400,
    description: 'Name too short (1 character)'
  },
  {
    name: 'John',
    email: 'user@gmail.com',
    message: 'Short',
    company: '',
    expectedStatus: 400,
    description: 'Message too short (5 characters)'
  },
  {
    name: 'John',
    email: 'user@gmail.com',
    message: 'This message has too many repeated characters aaaaa',
    company: '',
    expectedStatus: 400,
    description: 'Message with repeated characters'
  },
  {
    name: 'John',
    email: 'user@gmail.com',
    message: 'Just letters',
    company: '',
    expectedStatus: 400,
    description: 'Message with only letters and very short length'
  }
];

async function testSubmission(testCase) {
  try {
    console.log(`\n🧪 Testing: ${testCase.description}`);
    console.log(`   Data: ${JSON.stringify({
      name: testCase.name,
      email: testCase.email,
      message: testCase.message.substring(0, 50) + '...',
      company: testCase.company
    })}`);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testCase.name,
        email: testCase.email,
        message: testCase.message,
        company: testCase.company
      })
    });

    const data = await response.json();
    
    if (response.status === testCase.expectedStatus) {
      console.log(`   ✅ PASS - Status: ${response.status} (Expected: ${testCase.expectedStatus})`);
      if (data.message) {
        console.log(`   Response: ${data.message}`);
      }
    } else {
      console.log(`   ❌ FAIL - Status: ${response.status} (Expected: ${testCase.expectedStatus})`);
      console.log(`   Response: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERROR - ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting Bot Protection Tests');
  console.log('=====================================');
  
  for (const testCase of testCases) {
    await testSubmission(testCase);
    // Small delay between tests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n🏁 Tests completed!');
  console.log('\nNote: Check your server logs for detailed bot protection logging.');
  console.log('Look for [BOT_PROTECTION] and [LEGITIMATE_SUBMISSION] entries.');
}

// Run the tests
runTests().catch(console.error);
