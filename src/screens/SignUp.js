import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Button, Icon } from "react-native-elements"

export default class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Cadastre-se'
    };

    state = {
        username: '', password: '', email: '', phone_number: ''
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    signUp = async () => {
        const { username, password, email, phone_number } = this.state
        try {
            // here place your signup logic
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('name', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phone Number'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('phone_number', val)}
                />
                <Button
                    title='Cadastrar'
                    onPress={this.signUp}
                    buttonStyle={styles.botao}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: (Dimensions.get('window').width) * 8 / 10,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 5,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        alignItems: 'center',
        color: '#f42',
        borderColor: "#000",
        borderWidth: 3,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 30
    },
})