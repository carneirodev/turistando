import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Keyboard,
    Picker
} from 'react-native';
import {
    Button,
} from 'react-native-elements';


export default class EditarDados extends Component {
    constructor(props) {
        super(props);


        this.state = {
            loading: false,
        };

        this.arrayholder = [];
    }

    saveChanges = async () => {
        const { username, password, email, phone_number } = this.state
        try {
            // here place your signup logic///////////////

            /////////////////////////////
            await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.goBack();
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F2E3BC',
                    }}>
                    <Text style={styles.textoTitulo}>Editando Dados</Text>
                </View>
                <View
                    style={{
                        flex: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ScrollView>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                placeholder='Nome'
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('name', val)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Senha'
                                secureTextEntry={true}
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('password', val)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Email'
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('email', val)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Telefone(Formato: 021-999999999)'
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('telefone', val)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Bairro'
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('bairro', val)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Cidade'
                                autoCapitalize="none"
                                placeholderTextColor="rgb(87, 128, 178)"
                                onChangeText={val => this.onChangeText('cidade', val)}
                            />
                            <View style={styles.containerPicker}>
                                <Text style={styles.texto}>Qual seu jeito?</Text>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={styles.pickerEstilo}
                                    pickerStyleType={styles.input}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item label="Aventureiro!" value="aventureiro" />
                                    <Picker.Item label="Cultural!" value="cultural" />
                                    <Picker.Item itemStyle={styles.texto} label="Baladeiro!" value="baladeiro" />
                                    <Picker.Item label="Tradicional!" value="tradicional" />
                                </Picker>
                            </View>
                            <View style={styles.containerPicker}>
                                <Text style={styles.texto}>QUEM VOCÊ QUER SER?</Text>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={styles.pickerEstilo}
                                    pickerStyleType={styles.input}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item itemStyle={styles.texto} label="Quero ser turista!" value="turista" />
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
                                    onChangeText={val => this.onChangeText('pousadaHostel', val)}
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
                                    onChangeText={val => this.onChangeText('diasDisponiveis', val)}
                                />
                            </View>
                            <Button
                                title='Salvar'
                                onPress={() => this.props.navigation.goBack()}
                                buttonStyle={styles.botao}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
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
    textoTitulo: {
        fontFamily: 'arial',
        fontSize: 30,
        color: '#75b8c8',
    },
})