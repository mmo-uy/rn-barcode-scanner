import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {LoadingStateType, Product} from 'types';
import {getAllProducts} from '../../services/products';
import {v4 as uuid} from 'uuid';
import {MockProducts} from '../../utils/constants';

export interface productState {
	products: Product[];
	selectedProduct?: Product | null;
	loading: LoadingStateType;
}

const initialState: productState = {
	products: [],
	selectedProduct: null,
	loading: 'idle',
};

export const fetchProducts = createAsyncThunk<Product[]>('products/getAll', async () => {
	// const response = await getAllProducts();
	// return response;
	return MockProducts;
});
export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProduct: (state, action: PayloadAction<Product>) => {
			if (state.loading === 'pending') {
				state.loading = 'idle';
			}
			state.selectedProduct = action.payload;
		},
		addBarcode: (state, action: PayloadAction<{id: string; barcode: string}>) => {
			if (state.loading === 'pending') {
				state.loading = 'idle';
			}
			const updatedProducts = state.products.map(prod => {
				if (prod.id === action.payload.id) {
					const updatedProduct = {...prod, barcode: action.payload.barcode} as Product;
					state.selectedProduct = updatedProduct;
					return updatedProduct;
				}
				return prod;
			});
			state.products = updatedProducts;
		},
		reset: state => initialState,
		clearProduct: state => {
			state.selectedProduct = initialState.selectedProduct;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, (state, _action) => {
			state.loading = 'pending';
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = 'failed';
			console.log('products.error', action.error);
		});
		builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
			state.loading = 'succeeded';
			state.products = action.payload
				.filter(
					p => typeof p.name === 'string' && p.name?.length > 0 && typeof p.price === 'number'
				)
				.map(prod => {
					return {...prod, id: uuid()} as Product;
				});
			console.log('products.success');
		});
	},
});

export const {setProduct, clearProduct, addBarcode, reset} = productSlice.actions;

export default productSlice.reducer;
