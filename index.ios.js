/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Geolocation from './app/Geolocation/Geolocation'
import Maps from './app/Maps'
import Details from './app/Details'
import { setCustomText } from 'react-native-global-props';




class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };


  render() {
    const { navigate } = this.props.navigation;
    return (

      <ImageBackground
        style={styles.backgroundImage}
        source={require('./scenery.jpg')}
      >
        <TouchableHighlight
          onPress={() => navigate('Geolocation')}
          underlayColor={'white'}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          <Text style={styles.text}>Hello Skye
          </Text>
        </TouchableHighlight >
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  text: {
    color: '#ffffff',
    fontSize: 65,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

const myproject = StackNavigator({
  Home: { screen: HomeScreen },
  Geolocation: { screen: Geolocation },
  Maps: { screen: Maps },
  Details: { screen: Details }
});

const customTextProps = {
  style: {
    fontFamily: 'GillSans'
  }
}

setCustomText(customTextProps);

AppRegistry.registerComponent('myproject', () => myproject);