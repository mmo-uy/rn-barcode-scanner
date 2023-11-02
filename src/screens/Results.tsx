import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {CustomFooter, CustomFooterButton, ProgressBar} from '../components';
import colors from '../theme/colors';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {TotalIconSVG} from '../assets/icons';
import {globalStyles} from '../theme/styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types';
import {fetchProducts, reset, selectProductWithBarcode} from '../features/products/productsSlice';
import {strings} from '../utils/constants';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	resultsCard: {
		borderRadius: 10,
		height: 120,
		marginVertical: 12,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		padding: 14,
		backgroundColor: colors.white,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 14,
		marginLeft: 4,
		color: colors.greyScale.darker2,
	},
	scanedContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	scannedAmountContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignContent: 'center',
	},
	scannedTitle: {
		color: colors.greyScale.darker1,
		fontSize: 16,
		marginRight: 12,
	},
	scanedWithBarcodeText: {
		color: colors.greyScale.darker2,
	},
	scanedTotal: {
		color: colors.greyScale.darker1,
	},
	listStyle: {height: '100%', marginHorizontal: 16, marginVertical: 0},
});
type ResultsProps = NativeStackScreenProps<RootStackParamList, 'Results'>;
export default function Results({navigation}: ResultsProps) {
	const dispatch = useAppDispatch();
	const {products} = useAppSelector(state => state.product);
	const withBarcode = products.filter(p => p.barcode && p!.barcode?.length > 0).length;
	const progress = (withBarcode / products.length) * 100;
	const progressPercentage = Math.min(100, Math.max(0, progress));
	const handleReset = useCallback(() => {
		Alert.alert(
			'Atención',
			'¿Borrar todos los datos almacenados?',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: () => {
						dispatch(reset());
						setTimeout(() => {
							dispatch(fetchProducts());
							navigation.navigate('Home');
						}, 1000);
					},
					style: 'default',
				},
			],
			{}
		);
	}, []);

	return (
		<View style={[styles.container, globalStyles.background]}>
			<ScrollView style={styles.listStyle}>
				<View style={[styles.resultsCard]}>
					<View style={styles.titleContainer}>
						<TotalIconSVG />
						<Text style={[styles.titleText, globalStyles.robotoBold]}>TOTALES</Text>
					</View>
					<View style={styles.scanedContainer}>
						<Text style={[styles.scannedTitle, globalStyles.robotoRegular]}>Escaneados:</Text>
						<View style={styles.scannedAmountContainer}>
							<Text
								style={[
									styles.scanedWithBarcodeText,
									globalStyles.robotoBold,
								]}>{`${withBarcode}`}</Text>
							<Text
								style={[
									styles.scanedTotal,
									globalStyles.robotoRegular,
									{
										marginHorizontal: 2,
									},
								]}>
								/
							</Text>
							<Text
								style={[
									styles.scanedTotal,
									globalStyles.robotoRegular,
								]}>{`${products.length} un`}</Text>
						</View>
					</View>
					<View>
						<ProgressBar progress={progressPercentage} />
					</View>
				</View>
			</ScrollView>
			<CustomFooter show>
				<CustomFooterButton
					onPress={handleReset}
					background={colors.status.success}
					text={{
						message: strings.reset,
					}}
				/>
			</CustomFooter>
		</View>
	);
}
