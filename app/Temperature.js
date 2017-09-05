import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableHighlight
} from 'react-native';

export default class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rovers: '',
      latitude: null,
      longitude: null,
      place: '',
      summary: '',
      visibility: '',
      wind: '',
    }
  }


  componentWillReceiveProps(nextProps) {
    const savedLat = nextProps.latitude;
    const savedLong = nextProps.longitude;
    console.log(savedLat, savedLong, 'variables');
    return fetch('https://api.darksky.net/forecast/b51fa6b6e3510a257d8115c7e555e257/' + savedLat + ',' + savedLong)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('my response', responseJson);
        this.setState({
          rovers: responseJson.currently.temperature,
          place: responseJson.timezone,
          summary: responseJson.currently.summary,
          visibility: responseJson.currently.visibility,
          wind: responseJson.currently.windSpeed,
          latitude: savedLat,
          longitude: savedLong
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {
    const index = this.state.place.indexOf('/');
    const place = this.state.place.slice(index + 1).replace('_', ' ');
    const editedPlace = place.toLowerCase().replace(/ /g, '');
    const summary = this.state.summary;

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={summary.includes('Rain') ? require('./Geolocation/rain.jpg') : summary === 'Sunny' ? require('./Geolocation/sunny.jpg') : summary.includes('Cloudy') ? require('./Geolocation/cloudy.jpg') : require('./Geolocation/details.jpg')}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }} >
          <Text style={styles.textone}>{place} {'\n'} {Math.floor(this.state.rovers)}{'\u00B0'} </Text>
          <Text style={styles.text}> {this.state.summary} {'\n'}
            visibility: {this.state.visibility}{'\n'} windspeed: {this.state.wind}
          </Text>
          <TouchableHighlight
            onPress={() =>
              this.props.navigate('Maps', { latitude: this.state.latitude, longitude: this.state.longitude, temperature: this.state.rovers, city: editedPlace })}
            underlayColor={'white'}
          >
            <Text style={styles.button}>
              let's go!
            </Text>
          </TouchableHighlight>
        </View>
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
  textone: {
    color: '#ffffff',
    fontSize: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  button: {
    color: '#ffffff',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
});
AppRegistry.registerComponent('Temperature', () => Temperature);