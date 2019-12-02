import React from 'react'
import {
    AsyncStorage,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Picker,
    Text,
    Alert
} from 'react-native'
import { Button, Icon } from "react-native-elements"
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../api';

export default class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Cadastre-se'
    };

    state = {
        name: '', lastName: '', email: '', password: '', telefone: '', bairro: '', cidade: '',
        personalidade: 'aventureiro', tipo: 'turista', hotel: '', disp: '', avaliacao: '', idade: '', 
        bio: 'Adicione uma bio para que possam te conhecer melhor! Basta clicar em Editar Perfil!'
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    signUp = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0
            || this.state.name.length === 0 || this.state.lastName.length === 0
            || this.state.telefone.length === 0 || this.state.bairro.length === 0
            || this.state.cidade.length === 0 || this.state.idade.length === 0) {
            this.setState({ error: 'Preencha todos os dados de cadastro para continuar!' }, () => false);
            Alert.alert('Erro', 'Preencha todos os dados de cadastro para continuar!');
        } else {
            try {
                const response = await api.post('/register', {
                    name: this.state.name,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    telefone: this.state.telefone,
                    bairro: this.state.bairro,
                    cidade: this.state.cidade,
                    personalidade: this.state.personalidade,
                    tipo: this.state.tipo,
                    hotel: this.state.hotel,
                    disp: this.state.avaliacao,
                    avaliacao: this.state.avaliacao,
                    idade: this.state.idade,
                    bio: this.state.bio
                });

                this.props.navigation.navigate('Auth');
            } catch (_err) {
                this.setState({ error: 'Houve um problema ao cadastrar, verifique suas credenciais!' });
                Alert.alert('Erro', 'Houve um problema ao cadastrar, verifique suas credenciais!');
                console.log(_err);
            }
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.name}
                        textContentType={"name"}
                        onChangeText={val => this.onChangeText('name', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Sobrenome'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.lastName}
                        textContentType={"familyName"}
                        onChangeText={val => this.onChangeText('lastName', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.email}
                        keyboardType={"email-address"}
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.password}
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Telefone(Formato: 021-999999999)'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.telefone}
                        keyboardType={"phone-pad"}
                        maxLength={15}
                        onChangeText={val => this.onChangeText('telefone', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Idade'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.idade}
                        onChangeText={val => this.onChangeText('idade', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Bairro'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.bairro}
                        onChangeText={val => this.onChangeText('bairro', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Cidade'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        value={this.state.cidade}
                        onChangeText={val => this.onChangeText('cidade', val)}
                    />
                    <View style={styles.containerPicker}>
                        <Text style={styles.texto}>Qual seu jeito?</Text>
                        <Picker
                            selectedValue={this.state.personalidade}
                            style={styles.pickerEstilo}
                            pickerStyleType={styles.input}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ personalidade: itemValue })
                            }>
                            <Picker.Item label="Aventureiro!" value="aventureiro" />
                            <Picker.Item label="Cultural!" value="cultural" />
                            <Picker.Item label="Baladeiro!" value="baladeiro" />
                            <Picker.Item label="Tradicional!" value="tradicional" />
                        </Picker>
                    </View>
                    <View style={styles.containerPicker}>
                        <Text style={styles.texto}>QUEM VOCÊ QUER SER?</Text>
                        <Picker
                            selectedValue={this.state.tipo}
                            style={styles.pickerEstilo}
                            pickerStyleType={styles.input}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ tipo: itemValue })
                            }>
                            <Picker.Item label="Quero ser turista!" value="turista" />
                            <Picker.Item label="Quero ser líder de Rota!" value="lider" />
                        </Picker>
                    </View>
                    <View style={styles.containerPicker}>
                        <Text style={styles.texto}>VOCÊ VEIO POR ALGUMA POUSADA/HOSTEL PARCEIRO?
                        SE SIM, DIGITA O NOME DELA AQUI :)</Text>
                        <TextInput
                            style={styles.inputMenor}
                            placeholder='POUSADA/HOSTEL'
                            autoCapitalize="none"
                            placeholderTextColor="rgb(87, 128, 178)"
                            value={this.state.hotel}
                            onChangeText={val => this.onChangeText('hotel', val)}
                        />
                    </View>
                    <View style={styles.containerPicker}>
                        <Text style={styles.texto}>CASO TENHA ESCOLHIDO LÍDER DE ROTA, QUAIS DIAS (E HORA)
                        NA SEMANA VOCÊ TEM PARA APRESENTAR SUA CIDADE?(ISSO PODE SER MODIFICADO QUANTAS
                        VEZES QUISER)</Text>
                        <TextInput
                            style={styles.inputMenor}
                            placeholder='Dias disponíveis'
                            autoCapitalize="none"
                            placeholderTextColor="rgb(87, 128, 178)"
                            value={this.state.disp}
                            onChangeText={val => this.onChangeText('disp', val)}
                        />
                    </View>
                    <Button
                        title='Cadastrar'
                        onPress={this.signUp}
                        buttonStyle={styles.botao}
                    />
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: "rgb(87, 128, 178)",
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 10
    },
    inputMenor: {
        borderColor: "rgb(87, 128, 178)",
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        width: (Dimensions.get('window').width) * 6 / 10,
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerPicker: {
        marginVertical: 15,
        width: (Dimensions.get('window').width) * 8 / 10,
        padding: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderColor: "rgb(87, 128, 178)",
        borderWidth: 2,
    },
    pickerEstilo: {
        color: "rgb(87, 128, 178)",
        width: (Dimensions.get('window').width) * 7 / 10,
    },
    texto: {
        color: "rgb(87, 128, 178)",
    },
    botao: {
        alignItems: 'center',
        backgroundColor: "rgb(87, 128, 178)",
        borderRadius: 20,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 15
    },
})