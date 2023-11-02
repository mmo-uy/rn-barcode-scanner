import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../theme/colors';

interface ProgressBarProps {
	progress: number;
	height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
	let barColor = colors.status.error;
	if (progress >= 26 && progress <= 50) {
		barColor = colors.status.attention;
	} else if (progress >= 51 && progress <= 75) {
		barColor = colors.status.warning;
	} else if (progress >= 76 && progress <= 100) {
		barColor = colors.status.success;
	}

	return (
		<View style={[styles.container]}>
			<View style={[styles.progress, {backgroundColor: barColor, width: `${progress}%`}]}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 8,
		borderRadius: 40,
		backgroundColor: '#F4F5FB',
	},
	progress: {
		height: 8,
		borderRadius: 40,
	},
});

export default ProgressBar;
