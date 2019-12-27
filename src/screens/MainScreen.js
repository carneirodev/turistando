import React, {Component} from 'react';
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
  Keyboard,
  ImageBackground,
  AsyncStorage,
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
} from 'react-native-elements';
import {MaskService} from 'react-native-masked-text';
//<script type="text/javascript" src="https://js.iugu.com/v2"></script>
import IOSIcon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Pagamento from './Pagamento';
import HistoricoScreen from './HistoricoScreen';
import CriarRotaScreen from './CriarRotaScreen';
import EditarRotaScreen from './EditarRotaScreen';
import EditarDados from './EditarDados';
import Match from './MatchPersonalidade'
import api from '../../api';
// {"Id":1,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":2,"cidade":"Poços de caldas","titulo":"#Partiu Prias","Saída":"11/11 - 10:00","Duração":"5 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":3,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Uma breve descrição"}

class MainScreen extends Component {
  //Tela inicial, nesta tela esta a pesquisa
  constructor(props) {
    super(props);
    global.cont = 0;
    global.aux = [];

    this.state = {
      loading: false,
      data: [],
      error: null,
      selecionado: [],
      dialogVisible: false,
      quantidadeItem: 0,
      user:[],
    };
    this.submit = this.submit.bind(this);
    this.arrayholder = [];
  }
  //Comentado até o backend estar pronto
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('@turistando2:token');
      const response = await api.get('/rotas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({loading: true});

      this.setState({
        data: response.data,
        loading: false,
      });
      this.arrayholder = [response.data];

      
      //data.log(response.data)
    } catch (response) {
      console.log('Erro:' + response);
    }


    const token = await AsyncStorage.getItem('@turistando2:token');
    const email = await AsyncStorage.getItem('@turistando2:userEmail');

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
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          width: '100%',
        }}
      />
    );
  };
  //Ainda não funcional

  searchFilterFunction2 = () => {
         
        
    let text=this.state.user.personalidade
    console.log("sera")
    console.log(text);
    if(text=="Aventureiro"){
        text="Aventureira"
    }
    if(text=="Baladeira"){
        text="Baladeiro"
    }
    const newData  = this.arrayholder[0].filter((item) => item.personalidade.toUpperCase() == text.toUpperCase()).map((item) => (item));
   
       
        this.setState({
          data: newData,
        });
      };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

let newData  = this.arrayholder[0].filter((item) => item.cidade.toUpperCase() == text.toUpperCase()).map((item) => (item));
console.log(text);
if(newData[0] == undefined  ){
 newData  = this.arrayholder[0].filter((item) => item.personalidade.toUpperCase() == text.toUpperCase()).map((item) => (item));
}
if(newData[0] == undefined || text== '' ){
  newData=this.arrayholder[0]
}
   
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <View>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Pesquise uma cidade"
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingLeft: (Dimensions.get('window').width * 3) / 10,
          }}>
          <IOSIcon
            name="ios-search"
            size={30}
            style={{alignItems: 'flex-end'}}
          />
        </View></View>
        <Button
      buttonStyle={styles.botaoLogin}
      onPress={this.searchFilterFunction2}
      title={<Text style={{ color: 'white' }}>Clique para dar o match!</Text>}>
  </Button>
      
      </View>
     
    );
  };

  submit(item) {
    //console.log(global.cont)
    //const { navigation } = this.props;
    //const itemId = navigation.getParam('dados');
    this.props.navigation.navigate('Modal', {dados: item}); //Próxima rota
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    //console.log("data" + this.data)
    return (
      <ImageBackground
        source={{
          uri:
            'https://static3.tcdn.com.br/img/img_prod/580806/papel_de_parede_calcadao_de_copacabana_2067_2_20190521103442.jpg',
        }}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, backgroundColor: '#e6e6e699', marginTop: 15}}>
          <View
            style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <TouchableHighlight
                  style={{
                    paddingTop: 5,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (Dimensions.get('window').width * 9) / 10,
                    height: (Dimensions.get('window').height * 2) / 10,
                    backgroundColor: 'white',
                  }}
                  onPress={() => this.submit(item)}>
                  <View style={styles.containerLateral}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW31R1zgG2sZbXIkWAyJPoX3udunpKPXxmeGm6Q8IURIkxa9R1uw&s',
                        }}
                        style={{
                          width: (Dimensions.get('window').width * 2.5) / 10,
                          height: (Dimensions.get('window').height * 1.5) / 10,
                        }}
                      />
                    </View>

                    <View style={{flex: 3, marginRight: 10, paddingTop: 24}}>
                      <View style={styles.containerTextoTitulo}>
                        <Text style={styles.titulo}>{item.nome}</Text>
                      </View>
                      <View style={styles.containerTexto}>
                        <Text style={styles.texto}>
                          {item.qtdturistas} Vagas
                        </Text>
                      </View>
                      <View style={styles.containerTexto}>
                        <Text style={styles.texto}>
                          {item.cidade}-{item.estado}
                        </Text>
                      </View>
                      <View style={styles.containerTexto}>
                        <Text style={styles.texto}>
                          {item.data} - {item.hora}
                        </Text>
                      </View>

                      <View style={styles.containerTexto}>
                        <Text style={styles.texto}>
                          Duração: {item.duracao} Horas
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

class Informacao extends Component {
  constructor(props) {
    super(props);
    global.cont = 0;
    global.aux = [];

    this.state = {
      loading: false,
      data: [],
      error: null,
      selecionado: [],
      dialogVisible: false,
      quantidadeItem: 0,
    };

    this.arrayholder = [];
  }
  //Comentado até o backend estar pronto
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    try {
      const {navigation} = this.props;
      const item = navigation.getParam('dados');
      console.log(item.user_email);
      const token = await AsyncStorage.getItem('@turistando2:token');
      let link = '/showUserByEmail/' + item.user_email;
      const response = await api.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({loading: true});

      this.setState({
        data: response.data,
        loading: false,
      });
      this.arrayholder = response;
      console.log('info:');
       console.log(response.data)
    } catch (response) {
      console.log('Erro info:' + response);
    }
  };

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('dados');
    const preco = `${item.valor}`;
    const novo = preco.slice(-2);
    const valototal = preco.slice(0, 2) + ',' + novo; //Arrumar isso aqui
    var money = MaskService.toMask('money', valototal);
    return (
      <ScrollView>
        <View style={stylesInformacao.container}>
          <View style={stylesInformacao.cabecalho}>
            <Icon name="room" size={30} color="#F2E3BC" />
            <Text style={{color: '#F2E3BC', fontSize: 25, flex: 4}}>
              Próxima Rota
            </Text>
            <Button
              buttonStyle={styles.botaoFechar}
              onPress={() => this.props.navigation.goBack()}
              title={<Text style={{color: 'white'}}>Voltar</Text>}></Button>
          </View>
          <View style={stylesInformacao.header}>
            <Image
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW31R1zgG2sZbXIkWAyJPoX3udunpKPXxmeGm6Q8IURIkxa9R1uw&s',
              }}
              style={{
                width: (Dimensions.get('window').width * 4) / 10,
                height: (Dimensions.get('window').height * 2) / 10,
              }}
            />
            <View style={stylesInformacao.headerContent}>
              <Text style={{color: 'white', fontSize: 20}}>{item.nome}</Text>
              <Text style={{color: 'white', fontSize: 15}}>
                Saída: {item.data} - {item.hora}
              </Text>
              <Text style={{color: 'white', fontSize: 15}}>
                Duração: {item.duracao}
              </Text>
              <View style={stylesInformacao.avaliacao}>
                <Text style={{color: 'white', fontSize: 15}}>
                  Avaliação: {item.avaliacao}
                </Text>
              </View>
            </View>
          </View>
          <View style={stylesInformacao.divisoria}>
            <Text style={stylesInformacao.titulo}>Descrição</Text>
            <Text style={stylesInformacao.texto}>{item.descricao}</Text>
          </View>
          <View style={stylesInformacao.divisoria}>
            <Text style={stylesInformacao.titulo}>Local de Saída</Text>
            <Text style={stylesInformacao.texto}>
              {item.saida}, {item.cidade}
            </Text>
          </View>
          {/* <View style={stylesInformacao.divisoria}>
            <Text style={{ textDecorationLine: 'underline', color: 'white' }}>
              Google Maps - Waze
            </Text>
          </View> */}
          <View style={stylesInformacao.divisoria}>
            <Text style={stylesInformacao.titulo}>Valor</Text>
            <Text style={stylesInformacao.titulo}> {money}</Text>
            <Button
              buttonStyle={styles.botaoLogin}
              onPress={() =>
                this.props.navigation.navigate('Pagamento', {
                  dados: item,
                  nome: this.state.data.name,
                })
              }
              title={<Text style={{color: 'white'}}>Pagar </Text>}></Button>
          </View>
          <View style={stylesInformacao.divisoria}>
            <Text style={stylesInformacao.titulo}>Líder de Rota</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{
                  uri:
                    'https://abrilexame.files.wordpress.com/2018/10/8dicas8.jpg?quality=70&strip=info&w=1000&h=1000.jpg',
                }}
                style={{
                  width: (Dimensions.get('window').width * 2) / 10,
                  height: (Dimensions.get('window').width * 2) / 10,
                  borderRadius: 100,
                }}
              />
              <View style={stylesInformacao.liderContent}>
                <Text style={{color: 'white', fontSize: 20}}>
                  {this.state.data.name}
                </Text>
                <Text style={{color: 'white', fontSize: 20}}>
                  {this.state.data.idade} anos
                </Text>
                <Text style={{color: 'white', fontSize: 20}}>
                  {this.state.data.personalidade}
                </Text>
              </View>
            </View>
          </View>
          <View style={stylesInformacao.divisoria}>
            <Button
              buttonStyle={styles.botaoLogin}
              onPress={() => this.props.navigation.goBack()}
              title={<Text style={{color: 'white'}}>Voltar</Text>}></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

class LiderScreen extends Component {
  //Tela inicial, nesta tela esta a pesquisa
  constructor(props) {
    super(props);
    global.cont = 0;
    global.aux = [];

    this.state = {
      loading: false,
      data: [],
      error: null,
      selecionado: [],
      dialogVisible: false,
      quantidadeItem: 0,
    };
    this.arrayholder = [];
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    //console.log(global.aux)
    return (
      <View style={{flex: 1, backgroundColor: '#e6e6e699'}}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2E3BC',
          }}>
          <Text style={styles.titulo2}>Menu Líder de rota</Text>
        </View>
        <View
          style={{
            flex: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            buttonStyle={styles.botaoLogin}
            onPress={() => this.props.navigation.navigate('CriarRota')}
            title={<Text style={{color: 'white'}}>Criar Rota</Text>}></Button>
          {/*<Button
            buttonStyle={styles.botaoLogin}
            onPress={() => this.props.navigation.navigate('EditarRotaScreen')}
            title={<Text style={{ color: 'white' }}>Editar Rota</Text>}>
          </Button>*/}

          {/* 
          <Button
            buttonStyle = {styles.botaoLogin}
            onPress={() => this.props.navigation.navigate('EditarDados')}
            title={<Text style={{ color: 'white' }}>Editar Dados</Text>}>
          </Button> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1.3,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 40,
    paddingLeft: 10,
  },
  containerLateral: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#75b8c8',
  },
  titulo2: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#75b8c8',
  },
  texto: {
    fontSize: 16,
  },
  containerLista: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTexto: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  containerTextoTitulo: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(87, 128, 178)',
    borderRadius: 20,
    width: (Dimensions.get('window').width * 6) / 10,
    height: (Dimensions.get('window').height * 0.6) / 10,
    margin: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },botaoLogin: {
    alignItems: 'center',
    backgroundColor: "rgb(87, 128, 178)",
    borderRadius: 20,
    width: (Dimensions.get('window').width) * 8 / 10,
    margin: 15
},
  inputContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    width: 300,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  botaoLogin: {
    alignItems: 'center',
    backgroundColor: 'rgb(87, 128, 178)',
    borderRadius: 20,
    width: (Dimensions.get('window').width * 8) / 10,
    margin: 15,
  },
  botaoFechar: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgb(87, 128, 178)',
    borderRadius: 20,
    width: (Dimensions.get('window').width * 2) / 10,
    justifyContent: 'center',
  },
});

const stylesInformacao = StyleSheet.create({
  container: {
    padding: (Dimensions.get('window').width * 1) / 30,
    flex: 1,
    backgroundColor: '#60ABAB',
  },
  cabecalho: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: (Dimensions.get('window').width * 1) / 20,
  },
  avaliacao: {
    flexDirection: 'row',
  },
  texto: {
    fontFamily: 'arial',
    color: 'white',
  },
  titulo: {
    fontFamily: 'arial',
    color: 'white',
    fontSize: 25,
  },
  divisoria: {
    paddingVertical: 10,
  },
  liderContent: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  botaoCancelar: {
    margin: 10,
    height: (Dimensions.get('window').width * 1) / 10,
    marginBottom: 20,
    backgroundColor: '#60ABAB',
  },
});

const RootStack = createStackNavigator(
  {
    Home: MainScreen,
    Modal: Informacao,
    Historico: HistoricoScreen,
    Lider: LiderScreen,
    CriarRota: CriarRotaScreen,
    EditarRotaScreen: EditarRotaScreen,
    EditarDados: EditarDados,
    Pagamento: Pagamento,
    Match: Match
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
export default createAppContainer(RootStack);
