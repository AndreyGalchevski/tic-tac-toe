
import axios from 'axios';

let baseURL = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://xsie-osies.herokuapp.com';
}

const Api = axios.create({ baseURL });

export default async function makeHttpRequest(method, url, data) {
  try {
    const response = await Api({ method, url, data });
    return response;
  } catch (error) {
    throw error;
  }
}
