/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ResultsScreen, ScanScreen} from './src/screens';
import {RootStackParamList} from 'types';
import {ThemeProvider} from 'styled-components/native';
import {defaultTheme} from './src/theme';
import colors from './src/theme/colors';
import {titles} from './src/utils/constants';

function App(): JSX.Element {
	const Stack = createNativeStackNavigator<RootStackParamList>();
	return (
		<Provider store={store}>
			<ThemeProvider theme={defaultTheme}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTitleStyle: {color: colors.primary.blue, fontSize: 16},
							headerTintColor: colors.primary.blue,
						}}>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={{
								title: titles.home,
							}}
						/>
						<Stack.Screen
							name="Scan"
							component={ScanScreen}
							options={{
								title: titles.scan,
							}}
						/>
						<Stack.Screen
							name="Results"
							component={ResultsScreen}
							options={{
								title: titles.results,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ThemeProvider>
		</Provider>
	);
}
export default App;
