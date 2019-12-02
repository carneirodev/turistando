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
    Alert,
    ScrollView
} from 'react-native';
import { Button, Icon } from "react-native-elements"
import backImage from '../img/backLogin.jpg'
//import backLogo from '../img/logo.png'
import logo from '../img/logoNome.png'
import { TextInput } from 'react-native-gesture-handler';
import api from '../../api';


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: null,
        tabBarLabel: null,
        header: null,
    };

    state = { email: '', password: '', error: '' };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.centralizar}>
                    <View style={styles.containerLogo}>
                        <ImageBackground source={logo} style={styles.backLogo}></ImageBackground>
                    </View>
                </View>

                <View style={styles.loginContainer}>
                    <View style={styles.containerRow}>
                        <Icon
                            name="mail"
                            size={40}
                            color="rgb(87, 128, 178)"
                        />
                        <TextInput
                            style={styles.inputLogin}
                            placeholderTextColor="rgb(87, 128, 178)"
                            placeholder={"Email"}
                            value={this.state.email}
                            keyboardType={"email-address"}
                            onChangeText={this.handleEmailChange}>
                        </TextInput>
                    </View>
                    <View style={styles.containerRow}>
                        <Icon
                            name="lock"
                            size={40}
                            color="rgb(87, 128, 178)"
                        />
                        <TextInput
                            style={styles.inputLogin}
                            placeholderTextColor="rgb(87, 128, 178)"
                            placeholder={"Senha"}
                            value={this.state.password}
                            onChangeText={this.handlePasswordChange}
                            secureTextEntry>
                        </TextInput>
                    </View>
                    <Button
                        buttonStyle={styles.botaoLogin}
                        onPress={this._signInAsync}
                        title={<Text style={{ color: 'white' }}>Login</Text>}>
                    </Button>
                    <Button
                        buttonStyle={styles.botaoVazio}
                        onPress={this._esqueceuSenha}
                        title={<Text style={{ color: "rgb(87, 128, 178)" }}>Esqueceu a senha?</Text>}>
                    </Button>
                    <Button
                        buttonStyle={styles.botaoVazio}
                        onPress={this._signUp}
                        title={<Text style={{ color: "rgb(87, 128, 178)" }}>Não possui conta? Cadastre-se agora!</Text>}>
                    </Button>
                </View>

            </ScrollView>
        );
    }

    _signInAsync = async () => {
        /*
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
        */
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
            Alert.alert('Erro', 'Preencha usuário e senha para continuar!');
        } else {
            try {
                const response = await api.post('/authenticate', {
                    email: this.state.email,
                    password: this.state.password,
                });


                let link = '/showUserByEmail/' + this.state.email
                const response2 = await api.get(link, {
                    headers: {
                        'Authorization': `Bearer ${response.data.token}`
                    }
                });
                const tipo = response2.data.tipo

                //await AsyncStorage.setItem('@turistando2:token', response.data.token);
                //await AsyncStorage.setItem('@turistando2:user', response.data);
                await AsyncStorage.multiSet([['@turistando2:token', response.data.token],
                ['@turistando2:userEmail', this.state.email],
                ['@turistando2:userTipo', tipo]])
/*
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'MainScreen' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);*/
                this.props.navigation.navigate('App');
            } catch (_err) {
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
                Alert.alert('Erro', 'Houve um problema com o login, verifique suas credenciais!');
                console.log(_err);
            }
        }
    };

    _signUp = async () => {
        this.props.navigation.navigate('SignUp');
    };

    _esqueceuSenha = async () => {
        this.props.navigation.navigate('EsqueceuSenha');
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginContainer: {
        flex: 6,
        alignItems: 'center',
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backgroundContainer: {
        flex: 4,
    },
    centralizar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        height: 200,
        width: 200,
        marginVertical: (Dimensions.get('window').height) * 1 / 10,
        backgroundColor: "rgb(87, 128, 178)",
    },
    backLogo: {
        height: 200,
        width: 260,
    },
    texto: {
        fontFamily: 'arial',
        fontSize: 20,
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
    eae: {
        color: "rgb(87, 128, 178)",
    },
    botaoLogin: {
        alignItems: 'center',
        backgroundColor: "rgb(87, 128, 178)",
        borderRadius: 20,
        width: (Dimensions.get('window').width) * 8 / 10,
        margin: 15
    },
    botaoVazio: {
        marginTop: 10,
        backgroundColor: "#FFF",
    }
})