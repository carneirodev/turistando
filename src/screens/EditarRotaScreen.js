import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Keyboard,
} from 'react-native';
import {
    Button,
} from 'react-native-elements';


export default class EditarRotaScreen extends Component {
    


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
                    <Text style={styles.textoTitulo}>Editando Rota</Text>
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
                                placeholder="Data"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Hora"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Quantidade de horas"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Quantidade de pessoas envolvidas (turistas)"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Personalidade da rota"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Descrição da rota"
                                placeholderTextColor="rgb(87, 128, 178)"
                                maxLength={20}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                        <Button
                            buttonStyle={[styles.botaoLogin]}
                            onPress={() => this.props.navigation.goBack()}
                            title = {<Text style={{ color: 'white' }}>Salvar dados</Text>}>
                        </Button>
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
        alignItems: 'center'
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
        borderColor: "rgb(87, 128, 178)",
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 10
    },
    botaoLogin: {
        alignItems: 'center',
        backgroundColor: "rgb(87, 128, 178)",
        borderRadius: 20,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 15
    },
})