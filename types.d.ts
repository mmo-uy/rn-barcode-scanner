export interface Product {
	id: string;
	name: string;
	imageUrl?: string;
	brand?: string;
	barcode?: string;
	price?: number;
}
export type RootStackParamList = {
	Home: undefined;
	Results: undefined;
	Scan: undefined;
};
export type LoadingStateType = 'idle' | 'pending' | 'succeeded' | 'failed';
