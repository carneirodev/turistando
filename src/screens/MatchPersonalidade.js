
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
import api from '../../api';
import IOSIcon from 'react-native-vector-icons/Ionicons';



export default class MatchPersonalidade extends Component {
    constructor(props) {
        super(props);
        global.cont = 0;
        global.aux = [];
    
        this.state = {
          loading: false,
          data: [],
          user: [],
          error: null,
          selecionado: [],
          dialogVisible: false,
          quantidadeItem: 0,
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
      searchFilterFunction = () => {
         
        
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
    
      // renderHeader = () => {
      //   return (
      //     <View >
      //         <Button
      //                   buttonStyle={styles.botaoLogin}
      //                   onPress={this._signInAsync}
      //                   title={<Text style={{ color: 'white' }}>Dar o match!</Text>}>
      //               </Button>
      //       {/* <TextInput
      //         placeholder="Pesquise uma cidade"
      //         onChangeText={text => this.searchFilterFunction(text)}
      //         autoCorrect={false}
      //         value={this.state.value}
      //       /> */}
      //       {/* <View
      //         style={{
      //           justifyContent: 'flex-end',
      //           alignItems: 'flex-end',
      //           paddingLeft: (Dimensions.get('window').width * 3) / 10,
      //         }}>
      //         <IOSIcon
      //           name="ios-search"
      //           size={30}
      //           style={{alignItems: 'flex-end'}}
      //         />
      //       </View> */}
      //     </View>
      //   );
      // };
    
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
                  ListHeaderComponent={<Button
                    buttonStyle={styles.botaoLogin}
                    onPress={this.searchFilterFunction}
                    title={<Text style={{ color: 'white' }}>Clique para dar o match!</Text>}>
                </Button>}
                />
              </View>
            </View>
          </ImageBackground>
        );
      }
    }


  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }, botaoLogin: {
      alignItems: 'center',
      backgroundColor: "rgb(87, 128, 178)",
      borderRadius: 20,
      width: (Dimensions.get('window').width) * 8 / 10,
      margin: 15
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