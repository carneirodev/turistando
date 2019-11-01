import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from './src/SideMenu'
import stackNav from './src/stacknav';
import 'react-native-gesture-handler';
const App = createDrawerNavigator({
  Item1: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

export default createAppContainer(App);