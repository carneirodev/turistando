import React from 'react'
import {
    AsyncStorage,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Picker,
    Text
} from 'react-native'
import { Button, Icon } from "react-native-elements"
import { ScrollView } from 'react-native-gesture-handler';

export default class EsqueceuSenha extends React.Component {
    static navigationOptions = {
        title: 'Esqueceu sua senha?'
    };

    state = {
        email: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    recuperar = async () => {
        const { username, password, email, phone_number } = this.state
        try {
            // here place your signup logic///////////////

            /////////////////////////////
            await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('App');
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.texto}>Digite aqui o email que deseja recuperar a senha:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor="rgb(87, 128, 178)"
                        onChangeText={val => this.onChangeText('name', val)}
                    />
                    <Button
                        title='Confirmar'
                        onPress={this.recuperar}
                        buttonStyle={styles.botao}
                    />
                </View>

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