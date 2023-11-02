import React, {PropsWithChildren, useCallback, useState} from 'react';
import {FlatList, StyleProp, ViewStyle} from 'react-native';
import {Product} from 'types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {clearProduct, setProduct} from '../features/products/productsSlice';
import SingleProduct from './SingleProduct';

type ProductsListProps = PropsWithChildren<{
	products: Product[];
	customStyle?: StyleProp<ViewStyle>;
}>;
function ProductsList({products, customStyle}: ProductsListProps) {
	const dispatch = useAppDispatch();
	const {selectedProduct} = useAppSelector(state => state.product);
	const handleOnPress = useCallback(
		(product: Product) => {
			if (selectedProduct && selectedProduct.id === product.id) {
				dispatch(clearProduct());
			} else {
				dispatch(setProduct(product));
			}
		},
		[selectedProduct]
	);
	return (
		<FlatList
			style={[customStyle]}
			data={products}
			keyExtractor={item => item.id}
			renderItem={({item}) => (
				<SingleProduct
					product={item}
					onPress={() => handleOnPress(item)}
					selectedProduct={selectedProduct!}
				/>
			)}
		/>
	);
}

export default ProductsList;
