import {
	ColorValue,
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

type CustomFooterButtonProps = PropsWithChildren<{
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	disabled?: boolean;
	customStyle?: StyleProp<ViewStyle>;
	icon?: {
		name: string;
		size?: number | undefined;
		color?: number | ColorValue | undefined;
	};
	text?: {
		color?: number | ColorValue | undefined;
		message: string;
	};
	background?: ColorValue | undefined;
}>;
const CustomFooterButton = ({
	onPress,
	customStyle,
	icon,
	text,
	disabled = false,
	background,
}: CustomFooterButtonProps) => {
	return (
		<View
			style={[
				styles.buttonContainer,
				customStyle,
				{backgroundColor: background ?? colors.primary.blue},
			]}>
			<TouchableOpacity onPress={onPress} disabled={disabled}>
				{icon ? (
					<Ionicons name={icon.name} size={icon.size} color={icon.color} />
				) : (
					<Text style={styles.message}>{text?.message ?? 'Example'}</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default CustomFooterButton;

const styles = StyleSheet.create({
	buttonContainer: {
		height: 60,
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		color: colors.white,
		fontSize: 22,
	},
});
