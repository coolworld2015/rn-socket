import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class rnsocket extends Component {
  constructor(props) {
    super(props);
	ws = new WebSocket('ws://ui-socket.herokuapp.com');
	//ws = new WebSocket('ws://echo.websocket.org');
 
	this.state = {
		message: ''
	}
  }
  
 componentWillMount() {
	//ws = new WebSocket('wss://ui-socket.herokuapp.com');
	//ws = new WebSocket('ws://echo.websocket.org');
 
	ws.onerror = (e) => {
		// connection opened
		this.message = 'error'
		//ws.send('something'); // send a message
	};	
	
	ws.onopen = () => {
		console.log('opened');
		// connection opened
 
		ws.send('Hello Irinka !!!'); // send a message
		this.setState({
			message: 'opened'
		});
	};
	
	ws.onmessage = (e) => {
		this.setState({
			message: e.data
		});
 
		console.log(e);
		console.log(e.data);
	};
 }
 
 	goBack() {
		ws.send('Said something');
	}
	
  render() {
    return (
		<View style={styles.container}>
 
				<Text style={styles.welcome}>
					{this.state.message}
				</Text>
 
				<TouchableHighlight
					onPress={()=> this.goBack()}
					style={styles.button}>
					<Text style={styles.buttonText}>
						Send
					</Text>
				</TouchableHighlight>
 
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
		fontWeight: 'bold'
    },  
});

AppRegistry.registerComponent('rnsocket', () => rnsocket);
