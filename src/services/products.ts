import {Product} from 'types';
import {API_URL} from '../utils/constants';

export const getAllProducts = async (): Promise<Product[]> => {
	const res = await fetch(`${API_URL}`);
	const data = res.json();
	return data;
};
