import axios from 'axios';
import type { DmHeaders } from './types.dm';

const EIGHT_SECONDS = 8_000;

export default (auth?: string) => {
  const headers: DmHeaders = {};
  if (!auth && window.localStorage.getItem('token')) {
    auth = window.localStorage.getItem('token');
  }
  if (auth) {
    headers['authorization'] = auth;
  }

  return axios.create({
    baseURL: process.env.API_URL,
    timeout: EIGHT_SECONDS,
    headers
  });
}

export function parseUrl(url: string, params: Record<string, string | number>) {
  let finalUrl = url;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`{${key}}`, value.toString());
    });
  }
  return finalUrl;
}
