import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import colors from '../theme/colors';

type ImageNotFoundProps = PropsWithChildren<{
	customStyles?: StyleProp<ViewStyle>;
}>;

export default function ImageNotFound({customStyles}: ImageNotFoundProps) {
	return (
		<View style={[customStyles, styles.noImageSquareContainer]}>
			<Text style={styles.noImageText}>No Image</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	noImageSquareContainer: {
		backgroundColor: colors.greyScale.darker,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noImageText: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 12,
	},
});
