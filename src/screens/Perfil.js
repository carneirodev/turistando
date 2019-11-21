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
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// {"Id":1,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 14:00","Duração":"3 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":2,"cidade":"Poços de caldas","titulo":"#Partiu Prias","Saída":"11/11 - 10:00","Duração":"5 Horas","Vaga":"2 Vagas","description":"Uma breve descrição"},
// 			{"Id":3,"cidade":"Poços de caldas","titulo":"Igrejas Históricas","Saída":"11/11 - 16:00","Duração":"3 Horas","Vaga":"6 Vagas","description":"Uma breve descrição"}
import EditarDados from './EditarDados';
class Perfil extends Component {
  static navigationOptions = {
    title: 'Informações',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
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
          <View style={styles.bodyContent}>
            <Text style={styles.name}>André Matos</Text>
            <Text style={styles.info}>Aventureiro</Text>
            <Text style={styles.description}>
              “Sempre permaneça aventureiro. Por nenhum momento se esqueça de
              que a vida pertence aos que investigam. Ela não pertence ao
              estático; Ela pertence ao que flui. Nunca se torne um
              reservatório, sempre permaneça um rio.”
            </Text>
            </View></View>
          </View><View style={styles.box1}>
            <View><Text style={{fontSize:15}}>Avaliação</Text></View>
          <View style={{flexDirection:"row"}}>
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
    flex:1
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
    flex:2,
    justifyContent:"flex-end"
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
  },
  info: {
    fontSize: 25,
    color: '#75B8C8',
   
  },
  description: {
    fontSize: 18,
    color: 'black',
   
    textAlign: 'center',
  },
  buttonContainer: {
  margin:20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },container:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,backgroundColor: '#e6e6e699'
  },box1:{
    flex:1, justifyContent: 'center',
    alignItems: 'center',
  },box2:{
    flex:4, justifyContent: 'center',marginTop:10,
    alignItems: 'center',
  }
});
const RootStack = createStackNavigator(
  {
    Home: Perfil,
    Editar:EditarDados
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
export default createAppContainer(RootStack);
