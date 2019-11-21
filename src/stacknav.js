import React, {Component} from 'react' ;
import {
	Platform,
	StyleSheet,
	Text,
	View, TouchableOpacity
} from 'react-native';
import { NavigationActions,createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import MainScreen from './screens/MainScreen';
import 'react-native-gesture-handler';
import Perfil from './screens/Perfil';

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
			headerRight:(<TouchableOpacity  onPress={() => navigation.navigate('Info')
			}>
			<View style={{
				paddingRight: 15
			}}>
				<IOSIcon
					name="ios-contact"
					size={30}
				/>
			</View>
		</TouchableOpacity>
		)
		})
	},Info:{
		screen: Perfil,
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
			headerRight:(<TouchableOpacity  onPress={() => navigation.goBack()
			}>
			<View style={{
				paddingRight: 15
			}}>
				<IOSIcon
					name="ios-arrow-back"
					size={30}
				/>
			</View>
		</TouchableOpacity>
		)
		})
	}
},  {initialRouteName: 'Main'});

export default stackNav;