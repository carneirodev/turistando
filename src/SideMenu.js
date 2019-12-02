import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from "react-native-elements"
import 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/FontAwesome';

let botaoVar = <View></View>
let tipo = ""

class SideMenu extends Component {


	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route

		});
		this.props.navigation.dispatch(navigateAction);
	}


	componentDidMount = async () => {
        tipo = await AsyncStorage.getItem('@turistando2:userTipo');
    }


	_signOutAsync = async () => {
		/*
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');*/

		let keys = ['@turistando2:token', '@turistando2:userEmail', '@turistando2:userTipo'];
		await AsyncStorage.multiRemove(keys, (err) => {
			// keys k1 & k2 removed, if they existed
			// do most stuff after removal (if you want)
		});
		this.props.navigation.navigate('Auth');
	};


	render() {

		if (tipo == "lider" || tipo == "Lider") {
			botaoVar =
				<View>
					<Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Lider')}>
						Lider de rota
					</Text>
				</View>
		}

		return (
			<View style={styles.container}>
				<Button
					buttonStyle={estilo.botaoFechar}
					icon={
						<Icon
							name="clear"
							size={20}
							color="black"
						/>
					}
					onPress={() => this.props.navigation.closeDrawer()}
				/>
				<ScrollView>
					<View>
						<Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Home')}>
							Rotas disponiveis
            			</Text>
					</View>


					<View>
						<Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Historico')}>
							Histórico
            			</Text>
					</View>



					<View>
						<Text style={styles.sectionHeadingStyle} onPress={() => this.props.navigation.closeDrawer()}>
							Ajuda
            			</Text>
					</View>

					{botaoVar}

				</ScrollView>
				<View style={styles.footerContainer}>
					<Button title="Sobre" onPress={this._signOutAsync}></Button>
				</View>

				<View style={styles.footerContainer}>
					<Button title="Sair" onPress={this._signOutAsync}></Button>
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

export default SideMenu;


const estilo = StyleSheet.create({
	botaoFechar: {
		margin: 10,
		width: (Dimensions.get('window').width) * 1 / 10,
		height: (Dimensions.get('window').width) * 1 / 10,
		marginBottom: 20,
		backgroundColor: "#FFF"
	}
});