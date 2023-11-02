import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from 'types';
import {HomeScreen, ResultsScreen, ScanScreen} from '../screens';
import {Alert, Button, StyleSheet, Text, Touchable, TouchableOpacity} from 'react-native';
import {MockProducts, cameraIcon, checkmarkIcon, keyPadIcon} from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabsContainer() {
	const selectedProduct = null;
	const hasBarcode = false;
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({route}) => ({
				tabBarStyle: [styles.tabHeight],
				tabBarShowLabel: false,
				tabBarIcon: ({focused, color, size}) => {
					let iconName: string;
					if (route.name === 'Home') {
						iconName = keyPadIcon;
					} else if (route.name === 'Scan') {
						iconName = cameraIcon;
					} else if (route.name === 'Results') {
						iconName = checkmarkIcon;
					}
					return <Ionicons name={iconName!} size={size} color={color} />;
				},
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'grey',
				tabBarHideOnKeyboard: true,
				tabBarActiveBackgroundColor: '#585858',
				tabBarInactiveBackgroundColor: '#A8AAAC',
			})}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerTitleStyle: styles.headerStyle,
					tabBarActiveBackgroundColor: '#585858',
					tabBarInactiveBackgroundColor: '#A8AAAC',
					title: `Listado de productos - ${MockProducts.length}`,
				}}
			/>
			<Tab.Screen
				name="Scan"
				component={ScanScreen}
				listeners={{
					tabPress: e => {
						if (selectedProduct && hasBarcode) {
							e.preventDefault();
						}
					},
				}}
				options={{
					headerLeft: () => (
						<TouchableOpacity>
							<Ionicons name="chevron-back" size={24} color="#2979FF" />
						</TouchableOpacity>
					),
					tabBarHideOnKeyboard: true,
					title: 'Escanee el código EAN',
					headerTitleStyle: styles.headerStyle,
					tabBarActiveBackgroundColor: '#2F2F2F',
					tabBarInactiveBackgroundColor: '#A8AAAC',
				}}
			/>
			<Tab.Screen
				name="Results"
				component={ResultsScreen}
				listeners={{
					tabPress: e => {
						if (selectedProduct && hasBarcode) {
							e.preventDefault();
						}
					},
				}}
				options={{
					title: 'Resumen',
					headerTitleStyle: styles.headerStyle,
					tabBarActiveBackgroundColor: '#1DB779',
					tabBarInactiveBackgroundColor: '#939598',
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabHeight: {
		height: 60,
	},
	headerStyle: {
		color: '#2979FF',
		fontFamily: 'Roboto Regular',
		fontWeight: '400',
		fontSize: 16,
	},
});
