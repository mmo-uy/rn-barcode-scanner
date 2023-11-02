import {StyleSheet} from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
	robotoLight: {
		fontFamily: 'Roboto Light',
		fontWeight: '300',
	},
	robotoRegular: {
		fontFamily: 'Roboto Regular',
		fontWeight: '400',
	},
	robotoMedium: {
		fontFamily: 'Roboto Medium',
		fontWeight: '500',
	},
	robotoBold: {
		fontFamily: 'Roboto Bold',
		fontWeight: '700',
	},
	background: {
		backgroundColor: colors.primary.light,
	},
});
