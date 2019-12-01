import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/Login';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import api from '../../api';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = { email: '', password: '', error: '' };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('Cadastro');
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
            Alert.alert('Erro', 'Preencha usuário e senha para continuar!');
        } else {
            try {
                const response = await api.post('/authenticate', {
                    email: this.state.email,
                    password: this.state.password,
                });


                await AsyncStorage.setItem('@safeEconomy:token', response.data.token);

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            } catch (_err) {
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
                Alert.alert('Erro', 'Houve um problema com o login, verifique suas credenciais!');
            }
        }
    };

    render() {
        return (
            <View style={styles.view}>

                <Input
                    placeholder="  Endereço de e-mail"
                    containerStyle={styles.input}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    leftIcon={<Icon name='envelope' size={24} color='#F5F5F5F5' />}
                    value={this.state.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="  Senha"
                    containerStyle={styles.inputSenha}
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    leftIcon={<Icon name='lock' size={34} color='#F5F5F5F5' />}
                    value={this.state.password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                <Button
                    title='Entrar'
                    type='outline'
                    onPress={this.handleSignInPress}
                    titleStyle={{ fontSize: 21, color: '#32CD32' }}
                    buttonStyle={styles.button}
                />
                <Button
                    title='Cadastre-se'
                    type='outline'
                    onPress={this.handleCreateAccountPress}
                    titleStyle={{ fontSize: 21, color: '#32CD32' }}
                    buttonStyle={styles.buttonCad}
                />
            </View>
        );
    }
}
