import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    Dimensions,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import { Button, Icon } from "react-native-elements"
import backImage from '../img/backLogin.jpg'
import backLogo from '../img/logo.png'
import { TextInput } from 'react-native-gesture-handler';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: null,
        tabBarLabel: null,
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={backImage} style={styles.backgroundContainer}>
                    <View style={styles.containerLogo}>
                        <ImageBackground source={backLogo} style={styles.backLogo}>
                        </ImageBackground>
                        <Text style={styles.texto}>
                            Bem vindo ao Turistando
                        </Text>
                    </View>
                </ImageBackground>


                <View style={styles.espaco}>
                </View>

                <View style={styles.loginContainer}>
                    <TextInput style={styles.inputLogin} placeholder={"Email"}></TextInput>
                    <TextInput style={styles.inputLogin} placeholder={"Senha"}></TextInput>
                    <Button
                        buttonStyle={styles.botaoLogin}
                        onPress={this._signInAsync}
                        title={<Text style={{ color: 'white' }}>Login</Text>}>
                    </Button>
                    <Button
                        buttonStyle={styles.botaoLogin}
                        onPress={this._signUp}
                        title={<Text style={{ color: 'white' }}>Cadastrar-se</Text>}>
                    </Button>
                </View>

            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    _signUp = async () => {
        this.props.navigation.navigate('SignUp');
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    espaco: {
        flex: 2,
    },
    loginContainer: {
        flex: 6,
        alignItems: 'center',
    },
    backgroundContainer: {
        flex: 4,
    },
    containerLogo: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: (Dimensions.get('window').width) * 2 / 10,
        paddingVertical: (Dimensions.get('window').height) * 2.5 / 10,
    },
    backLogo: {
        width: (Dimensions.get('window').width) * 2 / 10,
        height: (Dimensions.get('window').height) * 2 / 10,
    },
    texto: {
        fontFamily: 'arial',
        fontSize: 20,
    },
    inputLogin: {
        alignItems: 'center',
        borderColor: "#000",
        borderWidth: 2,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 10
    },
    botaoLogin: {
        alignItems: 'center',
        color: '#f42',
        borderColor: "#000",
        borderWidth: 3,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 15
    },
})