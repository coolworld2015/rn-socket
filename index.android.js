import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Dimensions,
	ScrollView
} from 'react-native';

class ListItem extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			width: Dimensions.get('window').width
		}
    }

    render() {
		if (this.props.item.message != 'still alive') {
			return (
				<View>
					<Text style={{		
						fontSize: 20,
						textAlign: 'center',
						margin: 10,
						backgroundColor: 'white',
						width: this.state.width * .95
					}}>
						{this.props.item.message}
					</Text>
					<Text style={{		
						fontSize: 10,
						textAlign: 'center',
						marginTop: -5,
						marginLeft: 10,
						backgroundColor: 'white',
						width: this.state.width * .95
					}}>
						{this.props.item.date}
					</Text>
				</View>
			);
		} else {
			return null;
		}
    }
}

export default class rnsocket extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			width: Dimensions.get('window').width,
			message: '',
			messages: [],
			messageText: ''
		}
		
		ws = new WebSocket('ws://ui-socket.herokuapp.com');
		//ws = new WebSocket('ws://echo.websocket.org');
		
		ws.onerror = (e) => {
			this.message = 'error'
		};
		
		ws.onopen = () => {
			ws.send('Hello Irinka !!!'); 
		};

		ws.onmessage = (e) => {
			let d = new Date; 
			this.state.messages.unshift({
				id: +new Date(),
				date: d.toTimeString().split(' ')[0],
				message: e.data
			})
			
			this.setState({
				messageText: ''
			});
		};
		
	}
 
 	goSend() {
		if (this.state.messageText == '') {
			this.setState({
				invalidValue: true
			});
			return;
		}	
		
		ws.send(this.state.messageText);
		this.setState({
			messageText: ''
		});
	}
	
    onChangeText(text) {
        this.setState({
            messageText: text
        })
    }

    showMessages() {
        return this.state.messages.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    item={item}
				/>
            )
        })
    }
	
	render() {
		var errorCtrl;

        if (this.state.invalidValue) {
            errorCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }
		
		return (
			<View style={styles.container}>
				<ScrollView style={{
 
					backgroundColor: 'white',
					borderColor: '#48BBEC',
					borderRadius: 5,
				}}>
 
						{this.showMessages()}	 
 			 
				</ScrollView>
				
				{errorCtrl}
				
				<TextInput
					underlineColorAndroid='rgba(0,0,0,0)'
					onChangeText={(text)=> this.setState({
						messageText: text,
						invalidValue: false
					})}
					value={this.state.messageText}
					style={{ 
						height: 50,
						width: this.state.width * .95,
						marginTop: 10,
						padding: 4,
						fontSize: 18,
						borderWidth: 1,
						borderColor: 'lightgray',
						borderRadius: 5,
						color: 'black',
						backgroundColor: 'white'
					}} 
					placeholder='Text'>
				</TextInput>

				<TouchableHighlight
					onPress={()=> this.goSend()}
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
		backgroundColor: 'white'
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
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
    buttonText: {
        color: '#fff',
        fontSize: 20,
		fontWeight: 'bold'
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }	
});

AppRegistry.registerComponent('rnsocket', () => rnsocket);
