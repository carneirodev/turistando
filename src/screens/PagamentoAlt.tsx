import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  GooglePay,
  RequestDataType,
  AllowedCardNetworkType,
  AllowedCardAuthMethodsType,
} from 'react-native-google-pay';
import {Button, Image, Avatar} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createAppContainer,
  NavigationScreenProps,
  NavigationEvents,
} from 'react-navigation';
const allowedCardNetworks: AllowedCardNetworkType[] = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = [
  'PAN_ONLY',
  'CRYPTOGRAM_3DS',
];

const stripeRequestData: RequestDataType = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      gateway: 'stripe',
      gatewayMerchantId: '',
      stripe: {
        publishableKey: 'pk_test_28CkyPg92jANqCPJitDgKRHz00zgBjTwgg',
        version: '2018-11-08',
      },
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: JSON.stringify(props.navigation.getParam('dados')),
    totalPriceStatus: 'FINAL',
    currencyCode: 'BRL',
  },
  merchantName: 'Example Merchant',
};



export class Pagamento extends Component<NavigationScreenProps> {
  componentDidMount() {
    // Set the environment before the payment request
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    }
  }

 

  
  payWithStripeGooglePay = () => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(stripeRequestData)
            .then(this.handleSuccess)
            .catch(this.handleError);
        }
      },
    );
  };

  handleSuccess = (token: string) => {
    // Send a token to your payment gateway
    Alert.alert('Pagamento Efetuado', `token: ${token}`);
    this.props.navigation.goBack();
  };
  

  handleError = (error: any) => {
    //Alert.alert('Pagamento Cancelado')
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles2.container}>
        <View style={styles2.centro}>
          <View style={styles2.margem}>
            <TouchableOpacity
              style={[styles.button, styles.stripe]}
              onPress={this.payWithStripeGooglePay}>
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        
      </View>
    );
  }

  
}
const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: App,
    },
    Pagamento: {
      screen: Pagamento,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    width: 200,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  carteira: {
    backgroundColor: '#34e8eb',
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  saldoText: {
    color: '#ffffff',
    fontSize: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
  },
  norte: {
    flex: 1,
    backgroundColor: '#eff9ff',
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centro: {
    flex: 3,
    // flexDirection: 'row',
    backgroundColor: '#eff9ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  sul: {
    flex: 1,
    backgroundColor: '#eff9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margem: {
    marginTop: 20,
  },
  margem2: {
    marginTop: 20,
  },
});
