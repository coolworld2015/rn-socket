'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
	Dimensions
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
			username: 'Edward',
			password: '1',
			bugANDROID: ''
        }
    }
	
	componentDidMount() {
		appConfig.socket.name = this.state.username;
		this.setState({
			width: Dimensions.get('window').width
        });
	}
	
    onLogin() {
		this.setState({
            showProgress: true,
			bugANDROID: ' '
        });

        if (this.state.username == undefined ||
            this.state.password == undefined) {
            this.setState({
                badCredentials: true
            });
            return;
        }
		
		var url = appConfig.url;
		
        fetch(appConfig.url + 'api/login', {
            method: 'post',
			body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
				description: 'Android'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData.token) {
					appConfig.access_token = responseData.token;
					appConfig.socket.name = this.state.username;
					
					this.setState({
						badCredentials: false
					});
					
					this.props.onLogin();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    badCredentials: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    render() {
        var errorCtrl = <View />;

        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo}
						source={require('../../../logo.jpg')}
                    />
					<View style={styles.headerContainer}>
						<Text style={styles.heading}>
							RN-Socket
						</Text>
					</View>
                    <TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text)=> this.setState({
                            username: text,
                            badCredentials: false
                        })}
                         style={{ 
							height: 50,
							width: this.state.width * .90,
							marginTop: 10,
							padding: 4,
							fontSize: 18,
							borderWidth: 1,
							borderColor: 'lightgray',
							borderRadius: 5,
							color: 'black',
							backgroundColor: 'white'
						}} 
                        placeholder='Login'>Edward
                    </TextInput>

                    <TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text)=> this.setState({
                            password: text,
                            badCredentials: false
                        })}
                        style={{ 
							height: 50,
							width: this.state.width * .90,
							marginTop: 10,
							padding: 4,
							fontSize: 18,
							borderWidth: 1,
							borderColor: 'lightgray',
							borderRadius: 5,
							color: 'black',
							backgroundColor: 'white'
						}} 
                        placeholder='Password' 
						secureTextEntry={true}>1
                    </TextInput>

                    <TouchableHighlight
                        //onPress={()=> this.onLogin()}
                        onPress={()=> this.onLoginPressed()}
						style={styles.button}>
                        <Text style={styles.buttonText}>
							Log in
						</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
					
					<Text>{this.state.bugANDROID}</Text>
                </View>
            </ScrollView>
        )
    }

    onLoginPressed() {
        this.props.onLogin();
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },    
    logo: {
        width: 150,
        height: 150,
        paddingTop: 140,
        borderRadius: 20,
    },	
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center'
    },

    heading: {
        fontSize: 30,
        marginTop: 10,
		color: 'black',
        fontWeight: 'bold',
		textAlign: 'center'
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
        fontSize: 24,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;