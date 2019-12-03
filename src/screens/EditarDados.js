import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Keyboard,
    Picker,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {
    Button,
} from 'react-native-elements';
import api from '../../api';


export default class EditarDados extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: [],
            error: null,
            dialogVisible: false,
            name: '', lastName: '', email: '', telefone: '', bairro: '', cidade: '', bio: '',
            personalidade: 'aventureiro', tipo: 'turista', hotel: '', disp: '', avaliacao: '', idade: '',
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
            name: usuario.data.name,
            lastName: usuario.data.lastName,
            email: usuario.data.email,
            telefone: usuario.data.telefone,
            bairro: usuario.data.bairro,
            cidade: usuario.data.cidade,
            personalidade: usuario.data.personalidade,
            tipo: usuario.data.tipo,
            hotel: usuario.data.hotel,
            disp: usuario.data.disp,
            avaliacao: usuario.data.avaliacao,
            idade: usuario.data.idade,
            bio: usuario.data.bio,
            loading: false
        });
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    saveChanges = async () => {
        if (this.state.email.length === 0
            || this.state.name.length === 0 || this.state.lastName.length === 0
            || this.state.telefone.length === 0 || this.state.bairro.length === 0
            || this.state.cidade.length === 0 || this.state.idade.length === 0) {
            this.setState({ error: 'Preencha todos os dados de usuário!' }, () => false);
            Alert.alert('Erro', 'Preencha todos os dados de usuário!');
        } else {
            try {
                const idUser = this.state.user.id;
                //const idUser = await AsyncStorage.getItem('@turistando2:userEmail');
                const token = await AsyncStorage.getItem('@turistando2:token');
                let link = '/update/' + idUser
                console.log("link")
                console.log(link)
                console.log("idUser")
                console.log(idUser)
                console.log("token")
                console.log(token)
                const response = await api.put(link, {
                    name: this.state.name,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    telefone: this.state.telefone,
                    bairro: this.state.bairro,
                    cidade: this.state.cidade,
                    personalidade: this.state.personalidade,
                    tipo: this.state.tipo,
                    hotel: this.state.hotel,
                    disp: this.state.disp,
                    avaliacao: this.state.avaliacao,
                    idade: this.state.idade,
                    bio: this.state.bio
                });

                this.props.navigation.goBack();
            } catch (_err) {
                this.setState({ error: 'Houve um problema ao atualizar, verifique suas credenciais!' });
                Alert.alert('Erro', 'Houve um problema ao atualizar, verifique suas credenciais!');
                console.log(_err);
            }
        }
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
                            <View style={styles.containerPicker}>
                                <Text style={styles.texto}>Faça uma BIO para que possam te conhecer melhor!</Text>
                                <TextInput
                                    style={styles.inputMenor}
                                    placeholder='Bio'
                                    autoCapitalize="none"
                                    placeholderTextColor="rgb(87, 128, 178)"
                                    value={this.state.bio}
                                    onChangeText={val => this.onChangeText('bio', val)}
                                />
                            </View>
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
                                title='Salvar Dados'
                                onPress={this.saveChanges}
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