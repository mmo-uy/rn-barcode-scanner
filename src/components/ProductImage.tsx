import {Image, StyleSheet, ImageSourcePropType, View, Text, Alert} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import ImageNotFound from './ImageNotFound';

type ProductImageProps = PropsWithChildren<{
	url?: string;
	size?: {
		height?: number;
		width?: number;
	};
}>;

const styles = StyleSheet.create({
	imageSize: {width: '100%', height: '100%', resizeMode: 'cover'},
});
export default function ProductImage({url}: ProductImageProps) {
	const [onErrorImage, setOnErrorImage] = useState<boolean>();

	return (
		<View>
			{!onErrorImage ? (
				<Image style={styles.imageSize} source={{uri: url}} onError={() => setOnErrorImage(true)} />
			) : (
				<ImageNotFound customStyles={styles.imageSize} />
			)}
		</View>
	);
}
