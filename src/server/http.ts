import axios from 'axios';

const BASE_URL = 'https://scannect-be.onrender.com/api';
const DEFAULT_TIMEOUT = 10000;

export const createClient = () => {
	const axiosInstance = axios.create({
		baseURL: BASE_URL,
		timeout: DEFAULT_TIMEOUT,
		withCredentials: true,
		headers: { 'Content-Type': 'application/json' }
	});

	return axiosInstance;
};

export const httpClient = createClient();
