import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableHighlight, ImageBackground, StyleSheet } from 'react-native';
import Temperature from '../Temperature'
import Map from '../Maps'

class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      listDataFromChild: null

    };
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'position');
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  static navigationOptions = {
    title: 'Forecast',
  };
  render() {
    var navigate  = this.props.navigation.navigate
    const currentLat = this.state.latitude;
    const currentLong = this.state.longitude;
    console.log("hey here")
    return (
        <View  style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }} >
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Temperature latitude={currentLat} longitude={currentLong} navigate={navigate}/>
        </View>
    );
  }
}

export default Geolocation;

AppRegistry.registerComponent('Geolocation', () => Geolocation);