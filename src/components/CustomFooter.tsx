import {ColorValue, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {PropsWithChildren, ReactNode} from 'react';
import colors from '../theme/colors';

type CustomFooterProps = PropsWithChildren<{
	show: boolean;
	customStyle?: StyleProp<ViewStyle>;
	children?: ReactNode | undefined;
	background?: ColorValue | undefined;
}>;
const CustomFooter = ({show = true, customStyle, children, background}: CustomFooterProps) => {
	return (
		<View
			style={[
				customStyle,
				{
					display: show ? 'flex' : 'none',
					flex: 0,
					height: 60,
					backgroundColor: background ?? colors.primary.dark,
					flexDirection: 'row',
				},
			]}>
			{children}
		</View>
	);
};

export default CustomFooter;

const styles = StyleSheet.create({
	buttonContainer: {
		height: 60,
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
