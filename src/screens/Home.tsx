import {Keyboard, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomDialog, CustomFooter, ProductsList} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types';
import {cameraIcon, checkmarkIcon, keyPadIcon} from '../utils/constants';
import {useAppDispatch, useAppSelector, useViewportUnits} from '../app/hooks';
import {addBarcode, fetchProducts} from '../features/products/productsSlice';

import colors from '../theme/colors';
import CustomFooterButton from '../components/CustomFooterButton';
import {globalStyles} from '../theme/styles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonContainer: {
		height: 60,
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listStyle: {height: '100%', marginHorizontal: 16, marginVertical: 0},
});
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
function Home({navigation}: HomeProps) {
	const {vw} = useViewportUnits();
	const width = vw * 0.3;
	const dispatch = useAppDispatch();
	const {selectedProduct, products} = useAppSelector(state => state.product);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const isSelectedProductNull: boolean = selectedProduct === null;
	const isBarcodeEmpty: boolean = selectedProduct! && selectedProduct!.barcode?.length === 0;
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setIsKeyboardVisible(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setIsKeyboardVisible(false);
		});
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const onPressKeypad = () => {
		setPromptVisible(!isPromptVisible);
	};

	const onPressCamera = () => {
		navigation.navigate('Scan');
	};

	const onPressCheckmark = () => {
		navigation.navigate('Results');
	};

	const handlePromptCancel = () => {
		setPromptVisible(false);
	};

	const handlePromptSubmit = (inputValue: string) => {
		dispatch(addBarcode({id: selectedProduct?.id!, barcode: inputValue}));
		setPromptVisible(false);
	};
	return (
		<View style={[styles.container, globalStyles.background]}>
			<CustomDialog
				onCancel={handlePromptCancel}
				onSubmit={handlePromptSubmit}
				visible={isPromptVisible}
				placeholder="Código"
				keyboardType="numeric"
				title="Ingresar EAN"
			/>
			<ProductsList customStyle={styles.listStyle} products={products} />
			<CustomFooter show={!isKeyboardVisible}>
				<CustomFooterButton
					disabled={isSelectedProductNull}
					background={!isSelectedProductNull ? colors.greyScale.darker2 : colors.greyScale.grey}
					customStyle={[
						styles.buttonContainer,
						{
							width: width,
						},
					]}
					icon={{
						name: keyPadIcon,
						size: 24,
						color: colors.white,
					}}
					onPress={onPressKeypad}
				/>
				<CustomFooterButton
					disabled={isSelectedProductNull}
					background={!isSelectedProductNull ? colors.primary.dark : colors.greyScale.darker}
					customStyle={[
						styles.buttonContainer,
						{
							width: width,
						},
					]}
					icon={{
						name: cameraIcon,
						size: 24,
						color: colors.white,
					}}
					onPress={onPressCamera}
				/>
				<CustomFooterButton
					/* TODO change condition to:
						 only one product with barcode is enough
					*/
					disabled={isSelectedProductNull && !isBarcodeEmpty}
					background={
						!isSelectedProductNull && !isBarcodeEmpty
							? colors.status.success
							: !isSelectedProductNull && isBarcodeEmpty
							? colors.greyScale.light1
							: colors.greyScale.light1
					}
					customStyle={[
						styles.buttonContainer,
						{
							width: width,
						},
					]}
					icon={{
						name: checkmarkIcon,
						size: 20,
						color:
							!isSelectedProductNull && !isBarcodeEmpty ? colors.white : colors.greyScale.darker,
					}}
					onPress={onPressCheckmark}
				/>
			</CustomFooter>
		</View>
	);
}
export default Home;
