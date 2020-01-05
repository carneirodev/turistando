import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Keyboard,
    Alert,
    Picker,
    FlatList,
    AsyncStorage,
    ActivityIndicator,
    TouchableHighlight,
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import api from '../../api';
import { TextInputMask } from 'react-native-masked-text';

let email = ""

export default class RotasCadastradasScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dados: [],
            dadosFinais: []
        };
    }

    async componentDidMount() {
        email = await AsyncStorage.getItem('@turistando2:userEmail');
        let reque = await api.get('/rotas')
        this.setState({ dados: reque.data });
        let x = []
        for (let userObject of this.state.dados) {
            if (userObject.user_email == email) {
                x.push(userObject)
            }
        }
        this.setState({ dadosFinais: x });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Carregando</Text>
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
                    <Text style={styles.textoTitulo}>Rotas Cadastradas</Text>
                </View>
                <View
                    style={{
                        flex: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ScrollView>
                        <FlatList
                            data={this.state.dadosFinais}
                            renderItem={({ item }) => (
                                <View
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

                                        <View style={{ flex: 3, marginRight: 10, paddingTop: 24 }}>
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
                                </View>
                            )}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListHeaderComponent={this.renderHeader}
                        />
                    </ScrollView>
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
    textoTitulo: {
        fontFamily: 'arial',
        fontSize: 30,
        color: '#75b8c8',
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
    }, botaoLogin: {
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
