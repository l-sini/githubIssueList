import axios from 'axios';

export const xapi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain',
  },
});
