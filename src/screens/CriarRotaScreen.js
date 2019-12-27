import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import api from '../../api';
import {TextInputMask} from 'react-native-masked-text';

export default class CriarRotaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      selecionado: [],
      dialogVisible: false,
      quantidadeItem: 0,
      user: [],
      nome: '',
      data: '',
      hora: '',
      duracao: '',
      cidade: '',
      estado: '',
      qtdturistas: '',
      personalidade: '',
      descricao: '',
      saida: '',
      link: '',
      valor: '',
      avaliacao: '0',
    };
  }

  onChangeText = (key, val) => {
      

let s = val.replace(/[/]+/g, '');
 s = s.replace(/[,]+/g, '');
 s = s.replace(/[.]+/g, '');
 s = s.replace(/[R]+/g, '');
 s = s.replace(/[$]+/g, '');
    this.setState({[key]:s});console.log(val)
   console.log(this.state.valor)
   console.log(this.state.nome)
    console.log(s)
  };

  cadastrarRota = async () => {
    this.state.loading = true;
    if (
      this.state.nome.length === 0 ||
      this.state.data.length === 0 ||
      this.state.hora.length === 0 ||
      this.state.duracao.length === 0 ||
      this.state.cidade.length === 0 ||
      this.state.estado.length === 0 ||
      this.state.qtdturistas.length === 0 ||
      this.state.personalidade.length === 0 ||
      this.state.descricao.length === 0 ||
      this.state.saida.length === 0 ||
      this.state.link.length === 0 ||
      this.state.valor.length === 0
    ) {
      this.state.loading = false;
      this.setState(
        {error: 'Preencha todos os dados de cadastro para continuar!'},
        () => false,
      );
      Alert.alert(
        'Erro',
        'Preencha todos os dados de cadastro para continuar!',
      );
    } else {
      try {
        await api.post('/rotas', {
          nome: this.state.nome,
          data: this.state.data,
          hora: this.state.hora,
          duracao: this.state.duracao,
          cidade: this.state.cidade,
          estado: this.state.estado,
          avaliacao: this.state.avaliacao,
          qtdturistas: this.state.qtdturistas,
          personalidade: this.state.personalidade,
          descricao: this.state.descricao,
          saida: this.state.saida,
          link: this.state.link,
          valor: this.state.valor,
        });

        this.state.loading = false;
        this.props.navigation.goBack();
      } catch (_err) {
        this.state.loading = false;
        this.setState({
          error:
            'Houve um problema ao cadastrar, verifique se todos campos foram preenchidos!',
        });
        Alert.alert(
          'Erro',
          'Houve um problema ao cadastrar, verifique se todos campos foram preenchidos!',
        );
        console.log(_err);
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Carregando</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2E3BC',
          }}>
          <Text style={styles.textoTitulo}>Adicionando rota</Text>
        </View>
        <View
          style={{
            flex: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Nome da rota"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('nome', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInputMask
              style={styles.inputLogin}
              placeholder="Data"
              placeholderTextColor="rgb(87, 128, 178)"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                value={this.state.data}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('data', val)}
              />
              {/* <TextInput
                style={styles.inputLogin}
                placeholder="Data"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('data', val)}
              /> */}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Hora"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('hora', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Duração"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={10}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('duracao', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Cidade"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={30}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('cidade', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Estado (MG,SP...)"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={2}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('estado', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Quantidade de pessoas envolvidas (turistas)"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={5}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('qtdturistas', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Personalidade da rota"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('personalidade', val)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Descrição da rota"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={200}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('descricao', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Local de saída"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('saida', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Link da rota gerada pelo Google"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={40}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('link', val)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInputMask
                type={'money'}
                style={styles.inputLogin}
                placeholder="Valor da rota"
                placeholderTextColor="rgb(87, 128, 178)"
                keyboardType={'number-pad'}
                value={this.state.valor}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('valor', val)}
              />
              {/* <TextInput
                style={styles.inputLogin}
                placeholder="Valor da rota"
                placeholderTextColor="rgb(87, 128, 178)"
                maxLength={10}
                keyboardType={'number-pad'}
                onBlur={Keyboard.dismiss}
                onChangeText={val => this.onChangeText('valor', val)}
              /> */}
            </View>
            <Button
              buttonStyle={[styles.botaoLogin]}
              onPress={this.cadastrarRota}
              title={
                <Text style={{color: 'white'}}>Cadastrar Rota</Text>
              }></Button>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centralizar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontFamily: 'arial',
    fontSize: 20,
  },
  textoTitulo: {
    fontFamily: 'arial',
    fontSize: 30,
    color: '#75b8c8',
  },
  inputLogin: {
    borderColor: 'rgb(87, 128, 178)',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    width: (Dimensions.get('window').width * 8) / 10,
    margin: 10,
  },
  botaoLogin: {
    alignItems: 'center',
    backgroundColor: 'rgb(87, 128, 178)',
    borderRadius: 20,
    width: (Dimensions.get('window').width * 8) / 10,
    margin: 15,
  },
});
