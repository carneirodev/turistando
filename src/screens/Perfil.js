import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	ScrollView,
	TouchableHighlight,
	ActivityIndicator,
	TouchableOpacity,
	TextInput,
	AsyncStorage,
	Keyboard,
	ImageBackground,
} from 'react-native';
import {
	Image,
	Button,
	ListItem,
	SearchBar,
	Icon,
	FormLabel,
	FormInput,
	FormValidationMessage,
	Avatar,
} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// {"Id":1,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":2,"cidade":"Poços de caldas","titulo":"#Partiu Prias","Saída":"11/11 - 10:00","Duração":"5 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":3,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Uma breve descrição"}
import EditarDados from './EditarDados';
import api from '../../api';



class Perfil extends Component {

	static navigationOptions = {
		title: 'Informações',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	};

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			user: [],
			error: null,
			dialogVisible: false,
		};
	}

	componentDidMount = async () => {
		const email = await AsyncStorage.getItem('@turistando2:userEmail');
		const token = await AsyncStorage.getItem('@turistando2:token');
		let link = '/showUserByEmail/' + email
		const usuario = await api.get(link, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		this.setState({
			user: usuario.data,
			loading: false,
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.box2}>
					<View style={styles.header}>
						<Avatar
							source={{
								uri:
									'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
							}}
							size="xlarge"
							rounded
							style={styles.avatar}
						/></View>
					<View style={styles.body}>
						<Text style={styles.name}>{this.state.user.name}</Text>
						<Text style={styles.info}>{this.state.user.personalidade}</Text>
						<ScrollView style={styles.containerBio}>
							<Text style={styles.description}>
								{this.state.user.bio}
							</Text>
						</ScrollView>
					</View>
				</View>
				<View style={styles.box1}>
					<View>
						<Text style={{ fontSize: 15 }}>Avaliação</Text>
					</View>
					<View style={{ flexDirection: "row" }}>
						<Icon name="star" size={30} color="yellow" />
						<Icon name="star" size={30} color="yellow" />
						<Icon name="star" size={30} color="yellow" />
						<Icon name="star" size={30} color="yellow" />
						<Icon name="star" size={30} color="yellow" />
					</View>

					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('EditarDados')} >
						<Text>Editar perfil</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#67AAF9',
		flex: 1
	},
	containerBio: {
		marginVertical: 15,
		width: (Dimensions.get('window').width) * 8 / 10,
		height: (Dimensions.get('window').height) * 1 / 10,
		padding: 10,
		flex: 1,
		borderColor: "rgb(87, 128, 178)",
		borderWidth: 2,
		borderRadius: 10
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: '#F9E784',

		alignSelf: 'center',
		position: 'absolute',

	},
	name: {
		fontSize: 22,
		color: '#FFFFFF',
		fontWeight: '600',
	},
	body: {
		alignItems: 'center',
		flex: 2,
		justifyContent: "flex-end"
	},
	name: {
		fontSize: 28,
		color: 'black',
		fontWeight: '600',
	},
	info: {
		fontSize: 25,
		color: "rgb(87, 128, 178)",
	},
	description: {
		fontSize: 18,
		color: 'black',

		textAlign: 'center',
	},
	buttonContainer: {
		margin: 20,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		width: 250,
		borderRadius: 30,
		backgroundColor: "rgb(87, 128, 178)",
	}, container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1, backgroundColor: '#e6e6e699'
	}, box1: {
		flex: 1, justifyContent: 'center',
		alignItems: 'center',
	}, box2: {
		flex: 4, justifyContent: 'center', marginTop: 10,
		alignItems: 'center',
	}
});
const RootStack = createStackNavigator(
	{
		Home: Perfil,
		Editar: EditarDados
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
	},
);
export default createAppContainer(RootStack);
