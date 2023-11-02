import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import productsSlice from '../features/products/productsSlice';

export const store = configureStore({
	reducer: {
		product: productsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
