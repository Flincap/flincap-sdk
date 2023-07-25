// Import dependencies
const {FlincapApiClient} = require("flincap-sdk");

const baseURL = 'https://flincap.app/api';
const authToken = 'FLINCAP_API_KEY'; // Optional, only if the API requires authentication
const apiClient = new FlincapApiClient(baseURL, authToken);

// Get rate
apiClient.getRate('USDT', 'NGN').then((response) => {
  console.log(response.data); // Process the rate data here
}).catch((error) => {
  console.error(error.message, error.code);
});

apiClient.getSupportedCoins().then(response => {
  console.log(response);
}).catch(err => console.error(err));