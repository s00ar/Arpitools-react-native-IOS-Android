import axios from 'axios';

// Request API.
export const postUser = async () => {
  axios
  .get('http://localhost:1337/api/users', {
    headers: {
      'Authorization': "BEARER " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTgxNTgzLCJleHAiOjE2NjcxNzM1ODN9.8NjLIdsFVHXn17eB64DPfaZWw5pD4g62ooGAzYYBnhk",
    }
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
  })
}