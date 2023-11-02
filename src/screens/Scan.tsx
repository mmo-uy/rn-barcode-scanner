import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {withTiming} from 'react-native-reanimated';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {SingleProduct} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types';
import {addBarcode} from '../features/products/productsSlice';
import {ColorValue} from 'react-native';
import colors from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ScanProps = NativeStackScreenProps<RootStackParamList, 'Scan'>;
export default function Scan({navigation}: ScanProps) {
	const dispatch = useAppDispatch();
	const {selectedProduct} = useAppSelector(state => state.product);
	const devices = useCameraDevices();
	const device = devices.back;
	const translateY = useSharedValue(500);
	const [hasPermission, setHasPermission] = useState(false);
	const [showScanner, setShowScanner] = useState(false);
	const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
		checkInverted: true,
	});

	const handleShowScanner = () => {
		setShowScanner(!showScanner);
	};
	const captureBarcode = useCallback(
		(inputValue: string) => {
			setShowScanner(false);
			console.log({id: selectedProduct?.id!, barcode: inputValue});
			dispatch(addBarcode({id: selectedProduct?.id!, barcode: inputValue}));
		},
		[dispatch, navigation, selectedProduct]
	);
	useEffect(() => {
		if (barcodes[0]) {
			captureBarcode(barcodes[0].rawValue!);
		}
	}, [barcodes[0]]);

	useEffect(() => {
		(async () => {
			const status = await Camera.requestCameraPermission();
			setHasPermission(status === 'authorized');
		})();
	}, []);

	const AnimatedScaning = useAnimatedStyle(() => ({
		transform: [{translateY: translateY.value}],
	}));
	useEffect(() => {
		translateY.value = withRepeat(withTiming(-translateY.value, {duration: 4000}), 3, true);
	}, []);
	if (!device || !hasPermission) {
		return null;
	}

	const selectedProductComponent = selectedProduct ? (
		<SingleProduct
			customStyle={{
				marginHorizontal: 16,
			}}
			product={selectedProduct}
		/>
	) : null;

	const animatedView = showScanner ? (
		<Animated.View style={[styles.barcodeViewStyle, AnimatedScaning]} />
	) : null;

	return (
		<View style={[styles.containerStyle, {backgroundColor: colors.primary.dark}]}>
			{selectedProductComponent}
			<View
				style={{width: '100%', alignItems: 'flex-end', paddingHorizontal: 25, paddingVertical: 10}}>
				<TouchableOpacity onPress={handleShowScanner}>
					<Ionicons name="scan-circle-outline" size={55} color={colors.white} />
				</TouchableOpacity>
			</View>
			<View style={[styles.cameraContainerStyle]}>
				<View style={[styles.barcodeContainerStyle]}>
					<Camera
						style={[
							StyleSheet.absoluteFillObject,
							styles.cameraStyle,
							!showScanner ? {display: 'none'} : {},
						]}
						collapsable
						device={device}
						isActive={showScanner}
						frameProcessor={frameProcessor}
						frameProcessorFps={5}
						focusable={true}
						photo={true}
					/>
					{animatedView}
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		alignItems: 'center',
	},
	cameraContainerStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 350,
		height: 350,
	},
	cameraStyle: {
		backgroundColor: 'red',
	},
	barcodeContainerStyle: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: 'white',
		width: 350,
		height: 350,
		alignSelf: 'center',
		backgroundColor: 'white',
		overflow: 'hidden',
		justifyContent: 'center',
	},
	barcodeViewStyle: {
		borderWidth: 2,
		borderColor: 'red',
	},
});
