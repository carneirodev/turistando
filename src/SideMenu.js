import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from "react-native-elements"
import 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/FontAwesome';

class SideMenu extends Component {
	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render() {
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
						<Text style={styles.sectionHeadingStyle} 	onPress={() => this.props.navigation.closeDrawer()}>
							Minhas rotas
            </Text>
					</View>


					<View>
						<Text style={styles.sectionHeadingStyle}	onPress={() => this.props.navigation.closeDrawer()}>
							Histórico
            </Text>
					</View>



					<View>
						<Text style={styles.sectionHeadingStyle} 	onPress={() => this.props.navigation.closeDrawer()}>
							Ajuda
            </Text>
					</View>


					<View>
						<Text style={styles.sectionHeadingStyle} 	onPress={() => this.props.navigation.closeDrawer()}>
							Minhas rotas
            </Text>
					</View>




				</ScrollView>
				<View style={styles.footerContainer}>
					<Text>Sobre</Text>
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