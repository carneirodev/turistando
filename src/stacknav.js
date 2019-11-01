import React from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View, TouchableOpacity
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import 'react-native-gesture-handler';
const stackNav = createStackNavigator({
	Main: {
		screen: MainScreen,
		navigationOptions: ({ navigation }) => ({
			title: "",
			headerLeft: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
				<View style={{
					paddingLeft: 15
				}}>
					<IOSIcon
						name="ios-menu"
						size={30}
					/>
				</View>
			</TouchableOpacity>
			),
		})
	},
	Detail: {
		screen: DetailScreen,
		navigationOptions: ({ navigation }) => ({
			title: "Detail",
		})
	}
});

export default stackNav;