import React, {PropsWithChildren} from 'react';
import {GestureResponderEvent, StyleProp, Text, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

import {Product} from 'types';
import ProductImage from './ProductImage';
import colors from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = styled.TouchableOpacity`
	border-radius: 4px;
	border-color: grey;
	height: 110px;
	margin-vertical: 4px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: ${colors.white};
`;

const ImageContainer = styled.View`
	padding: 5px;
	height: 90px;
	width: 90px;
	flex: 1;
`;

const ProductDescription = styled.View`
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: stretch;
	background-color: ${colors.white};
	width: 100%;
	padding-horizontal: 2px;
	flex: 3;
`;

const BrandText = styled.Text`
	font-family: 'Roboto Medium';
	font-weight: 500;
	color: ${colors.primary.blue};
	padding-vertical: 2px;
	padding-horizontal: 2px;
`;

const NameText = styled.Text`
	font-family: 'Roboto Regular';
	font-weight: 400;
	color: black;
	font-size: 12px;
	flex-shrink: 1;
	padding-vertical: 2px;
	padding-horizontal: 2px;
`;

const PriceText = styled.Text`
	font-family: 'Roboto Bold';
	font-weight: 700;
	color: ${colors.primary.blue};
	font-size: 13px;
	padding-vertical: 2px;
	padding-horizontal: 2px;
`;

const BarcodeText = styled.Text`
	font-family: 'Roboto Bold';
	font-weight: 700;
	color: ${colors.primary.dark};
	font-size: 12px;
	padding-vertical: 2px;
	padding-horizontal: 2px;
	display: flex;
	align-content: center;
`;
const BarcodeContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;
type SingleProductProps = PropsWithChildren<{
	product: Product;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	selectedProduct?: Product | null;
	customStyle?: StyleProp<ViewStyle>;
}>;

export default function SingleProduct({
	product,
	onPress,
	selectedProduct,
	customStyle,
}: SingleProductProps) {
	const isSelected = selectedProduct && selectedProduct.id === product.id;

	return (
		<ProductCard
			onPress={onPress}
			style={[
				customStyle,
				isSelected ? {borderColor: colors.primary.blue, borderWidth: 1.5} : null,
			]}>
			<ImageContainer>
				<ProductImage url={product.imageUrl} />
			</ImageContainer>
			<ProductDescription>
				<BrandText>{product?.brand}</BrandText>
				<NameText>{product.name}</NameText>
				<PriceText>$ {product?.price}</PriceText>
				{product.barcode ? (
					<BarcodeContainer>
						<Ionicons
							name="barcode-outline"
							color={colors.primary.dark}
							size={24}
							style={{marginRight: 4}}
						/>
						<BarcodeText>{product?.barcode}</BarcodeText>
					</BarcodeContainer>
				) : null}
			</ProductDescription>
		</ProductCard>
	);
}
