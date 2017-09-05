import React, { Component } from 'react';
import { AppRegistry, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Details extends Component {
	static navigationOptions = {
		title: 'Details'
	};

	render() {
		const { params } = this.props.navigation.state;

		return (
			<ImageBackground
				style={styles.backgroundImage}
				source={require('./Geolocation/details.jpg')}
			>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
				<Text style={styles.text}>Name: {params.name}{"\n"}Address: {params.address}{"\n"} {params.address2}, {params.address3} {"\n"} Phone: {params.phone}</Text>
				{/* <Text style={styles.description}>{params.description}</Text> */}
			</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
	},
  text: {
		// flex:1,
		// justifyContent: 'center',
		// alignItems: 'center',
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'left',
		textAlignVertical: 'center',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	description: {
		color: '#ffffff',
    fontSize: 30,
    textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: 'rgba(0,0,0,0)'
	}
});

AppRegistry.registerComponent('Details', () => Details)