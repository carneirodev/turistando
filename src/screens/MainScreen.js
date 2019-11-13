import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,Dimensions,
	ScrollView,
	TouchableHighlight,ActivityIndicator
} from 'react-native';
import { Image, Button,ListItem, SearchBar, Icon } from "react-native-elements";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// {"Id":1,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":2,"cidade":"Poços de caldas","titulo":"#Partiu Prias","Saída":"11/11 - 10:00","Duração":"5 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":3,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Uma breve descrição"}
	
class  MainScreen extends Component {//Tela inicial, nesta tela esta a pesquisa
	constructor(props) {
	  super(props);
	  global.cont=0
	  global.aux = []
	  
	  this.state = {
		loading: false,
		data: [
			],
		error: null,
		selecionado:[],dialogVisible: false,quantidadeItem:0,
	  };
	  this.submit = this.submit.bind(this);
	  this.arrayholder = [];
	}
   //Comentado até o backend estar pronto
	 componentDidMount() {
	   this.makeRemoteRequest();
	 }
  
	 makeRemoteRequest = () => {
	   const url =[
		{"Id":1,"valor":"55,00","localDeSaida":"Avenida 3, 350 - Centro","cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Serão visitadas suas cachoeiras da região em um passeio imersivo que tem como objetivo conectar o turista à natureza em uma trilha calma e bela.","foto":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KCTe4B1W_XnGo0x_9bnWUXAaWGaX58cnI_iNkbZu-64u4MKinA&s.jpg"},
		{"Id":2,"valor":"80,00","localDeSaida":"Avenida Joao Pinheiro, 340 - Centro","cidade":"Poços de caldas","titulo":"#Partiu Praias","Saída":"11/11 - 10:00","Duração":"5 Horas","Vaga":"2 Vagas","description":"Serão visitadas suas cachoeiras da região em um passeio imersivo que tem como objetivo conectar o turista à natureza em uma trilha calma e bela pela praia.","foto":"https://www.viajali.com.br/wp-content/uploads/2018/01/praia-do-gunga-1-730x730.jpg"},
		{"Id":3,"valor":"55,00","localDeSaida":"Avenida 1, 330 - Centro","cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Serão visitadas suas cachoeiras da região em um passeio imersivo que tem como objetivo conectar o turista à natureza em uma trilha calma e bela.","foto":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KCTe4B1W_XnGo0x_9bnWUXAaWGaX58cnI_iNkbZu-64u4MKinA&s.jpg"},
		{"Id":4,"valor":"50,00","localDeSaida":"Avenida 1, 310 - Centro","cidade":"São Paulo","titulo":"Passeio Turistico","Saída":"12/11 - 16:00","Duração":"3 Horas","Vaga":"5 Vagas","description":"Serão visitadas monumentos da região em um passeio imersivo para o turista conhecer a história da maior cidade do Brasil .","foto":"https://media-cdn.tripadvisor.com/media/photo-s/18/99/d8/ed/paulista.jpg"},
		{"Id":5,"valor":"75,00","localDeSaida":"Avenida 1, 80 - Centro","cidade":"Rio de Janeiro","titulo":"Copa cabana","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Serão visitadas monumentos da região em um passeio maravilhoso pelo Rio de Janeiro.","foto":"https://upload.wikimedia.org/wikipedia/commons/6/62/Praia_de_Copacabana_-_Rio_de_Janeiro%2C_Brasil.jpg"}
];//URL da API  do JSON com as informações
	   this.setState({ loading: true });
  
	 	  this.setState({
	 		data: url,
	 		loading: false,
	 	  });
	 	  this.arrayholder =url;
	 	
	 };
  
	renderSeparator = () => {
	  return (
		<View
		  style={{
			height: 1,
			width: '100%',
			backgroundColor: '#CED0CE',
		  }}
		/>
	  );
	};
	//Ainda não funcional
	searchFilterFunction = text => {
	  this.setState({
		value: text,
	  });
  
	  const newData = this.arrayholder.filter(item => {
		const itemData = `${item.cidade.toUpperCase()} `;
		const textData = text.toUpperCase();
  
		return itemData.indexOf(textData) > -1;
	  });
	  this.setState({
		data: newData,
	  });
	};
  
	renderHeader = () => {
	  return (
		<SearchBar
		  placeholder="Pesquise uma cidade"
		  lightTheme
		  round
		  onChangeText={text => this.searchFilterFunction(text)}
		  autoCorrect={false}
		  value={this.state.value}
		/>
	  );
	};
  
  
  
	submit(item) {
	 //console.log(global.cont)
	  //const { navigation } = this.props;
	  //const itemId = navigation.getParam('dados'); 
	  this.props.navigation.navigate("Modal",{ dados: item })//Próxima rota
	 
	}
  
	render() {
	   
	  if (this.state.loading) {
		return (
		  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator />
		  </View>
		);
	  }
	  //console.log(global.aux)
	  return (
//		{"Cidade":"Poços de caldas","Titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
		<View style={{ flex: 1 }}>
		  <View style={{ flex: 10 }}>
		  <FlatList
			data={this.state.data}
			renderItem={({ item }) => (
		 <TouchableHighlight onPress={() => this.submit(item)}  >
      <View style={styles.containerLateral}>
				<View style={{flex:1,justifyContent: 'center',
		alignItems: 'center'}}>
				<Image		 
		 source={{uri: item.foto}}
		 style={{ width: 80, height: 80}}	   
        />	
	   </View>
		
	  <View style={{flex:3,marginRight:10}}>
		  
	  <View style={styles.containerTexto}>
	  <Text style={styles.titulo}>{item.titulo}</Text>
	  </View>
	  <View style={styles.containerTexto}>
        <Text style={styles.texto}>{item.Vaga} - {item.cidade}</Text>
      </View>
	  <View style={styles.containerTexto}>
        <Text style={styles.texto}>Saida: {item.Saída}</Text>
      </View>

	  <View style={styles.containerTexto}>
        <Text style={styles.texto}>Duração: {item.Duração}</Text>
      </View></View></View>
	    
    </TouchableHighlight>


			)}
			
		  
			ItemSeparatorComponent={this.renderSeparator}
			ListHeaderComponent={this.renderHeader}
  
  
		  />
		  </View>
		  
		</View>
  
  
  
	  );
	}
  }


  class Informacao extends Component {
	static navigationOptions = {
		title: "Informações",
		headerTitleStyle: {
		  fontWeight: "bold"
		}
	  };
	render() {
		const { navigation } = this.props;
		const item= navigation.getParam('dados');
		return (
			<ScrollView>
				<View style={stylesInformacao.container}>
					<View style={stylesInformacao.cabecalho}>
						<Icon
							name="room"
							size={30}
							color="#F2E3BC"
						/>
						<Text style={{ color: '#F2E3BC', fontSize: 25 }}>Próxima Rota</Text>
					</View>
					<View style={stylesInformacao.header}>
						<Image
							source={{uri: item.foto}}
							style={{ width: (Dimensions.get('window').width) * 4 / 10, height: (Dimensions.get('window').height) * 2 / 10 }}
						/>
						<View style={stylesInformacao.headerContent}>
							<Text style={{ color: 'white', fontSize: 20 }}>{item.titulo}</Text>
							<Text style={{ color: 'white', fontSize: 15 }}>Saída: {item.Saída}</Text>
							<Text style={{ color: 'white', fontSize: 15 }}>Duração: {item.Duração}</Text>
							<View style={stylesInformacao.avaliacao}>
								<Icon name="star" size={20} color="yellow" />
								<Icon name="star" size={20} color="yellow" />
								<Icon name="star" size={20} color="yellow" />
								<Icon name="star" size={20} color="yellow" />
								<Icon name="star" size={20} color="yellow" />
							</View>
						</View>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Text style={stylesInformacao.titulo}>Descrição</Text>
						<Text style={stylesInformacao.texto}>{item.description}</Text>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Text style={stylesInformacao.titulo}>Local de Saída</Text>
						<Text style={stylesInformacao.texto}>{item.localDeSaida}, {item.cidade}</Text>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Text style={{ textDecorationLine: "underline", color: "white" }}>Google Maps - Waze</Text>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Text style={stylesInformacao.titulo}>Valor</Text>
						<Text style={stylesInformacao.titulo}>R$ {item.valor}</Text>
						<Text style={{ color: '#F2E3BC', fontSize: 15 }}>Pagamento - Dinheiro</Text>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Text style={stylesInformacao.titulo}>Líder de Rota</Text>
						<View style={{ flexDirection: "row" }}>
							<Image
								source={{ uri: 'https://abrilexame.files.wordpress.com/2018/10/8dicas8.jpg?quality=70&strip=info&w=1000&h=1000.jpg' }}
								style={{ width: (Dimensions.get('window').width) * 2 / 10, height: (Dimensions.get('window').width) * 2 / 10, borderRadius: 100 }}
							/>
							<View style={stylesInformacao.liderContent}>
								<Text style={{color: 'white', fontSize: 20}}>Juliana Veríssimo</Text>
								<Text style={{color: 'white', fontSize: 20}}>43 Rotas Concluidas</Text>
							</View>
						</View>
					</View>
					<View style={stylesInformacao.divisoria}>
						<Button
							buttonStyle={stylesInformacao.botaoCancelar}
							title={<Text style={{color:"red"}}>Cancelar Rota</Text>}
							icon={
								<Icon
									name="clear"
									size={20}
									color="red"
								/>
							}
							onPress={() => this.props.navigation.goBack()}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}


  


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},containerLateral: {
		flex: 1,
		flexDirection: 'row'
		
	},
	titulo: {
	fontWeight: 'bold',
    fontSize: 30,color:"#75b8c8"
	},
	texto:{
		fontSize: 20,
		},
		containerLista: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},containerTexto: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	}
});


const stylesInformacao = StyleSheet.create({
	container: {
		padding: (Dimensions.get('window').width) * 1 / 30,
		flex: 1,
		backgroundColor: "#60ABAB",
	},
	cabecalho: {
		flexDirection: "row",
	},
	header: {
		flexDirection: "row",
		padding: 10
	},
	headerContent: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: (Dimensions.get('window').width) * 1 / 20,
	},
	avaliacao: {
		flexDirection: "row"
	},
	texto: {
		fontFamily: 'arial',
		color: 'white',
	},
	titulo: {
		fontFamily: 'arial',
		color: 'white',
		fontSize: 25
	},
	divisoria: {
		paddingVertical: 10
	},
	liderContent: {
		flex: 1,
		paddingHorizontal: 10,
		flexDirection: "column",
		justifyContent: "space-evenly"
	},
	botaoCancelar: {
		margin: 10,
		height: (Dimensions.get('window').width) * 1 / 10,
		marginBottom: 20,
		backgroundColor: "#60ABAB"
	}
});
const RootStack = createStackNavigator(
	{
		Home:  MainScreen,		  
		  Modal: Informacao,
	},
	{ 
	initialRouteName: "Home",
	  headerMode: 'none',
	}
  );
export default createAppContainer(RootStack);