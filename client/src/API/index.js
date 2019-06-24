
import axios from 'axios';

const baseURL = 'http://localhost:8080';

const Api = axios.create({ baseURL });

export default async function makeHttpRequest(method, url, data) {
  try {
    const response = await Api({ method, url, data });
    return response;
  } catch (error) {
    throw error;
  }
}
