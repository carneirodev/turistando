import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from './src/SideMenu'
import stackNav from './src/stacknav';
import 'react-native-gesture-handler';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SignInScreen from './src/screens/SignInScreen'
import SignUp from './src/screens/SignUp'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'


const App = createDrawerNavigator({
	Item1: {
		screen: stackNav,
	}
}, {
	contentComponent: SideMenu,
	navigationOptions: {
		title: null,
		tabBarLabel: null,
		header: null,
	},
	drawerWidth: Dimensions.get('window').width - 120,
});


const AppStack = createStackNavigator({ App });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp:SignUp });

export default createAppContainer(createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
));



/*
class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Welcome to the app!',
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="Show me more of the app" onPress={this._showMoreApp} />
				<Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
			</View>
		);
	}

	_showMoreApp = () => {
		this.props.navigation.navigate('Other');
	};

	_signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};
}*/