'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	Dimensions,
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
			if (this.props.item.name == appConfig.socket.name) {
				return (
					<View style={{
						margin: 10,
						marginTop: 10,
						backgroundColor: '#48BBEC',
						//borderColor: '#48BBEC',
						borderColor: '#48BBEC',
						borderRadius: 25,
						borderWidth: 5
					}}>
						<Text style={{		
							fontSize: 20,
							textAlign: 'center',
							margin: 10,
							marginTop: 0,
							backgroundColor: '#48BBEC',
							width: this.state.width * .85,
							color: 'white',
							fontWeight: 'bold'
						}}>
							{this.props.item.message}
						</Text>
						<Text style={{		
							fontSize: 10,
							textAlign: 'center',
							marginTop: -5,
							marginLeft: 10,
							backgroundColor: '#48BBEC',
							width: this.state.width * .85,
							color: 'white'
						}}>
							{this.props.item.date}
						</Text>					
						<Text style={{		
							fontSize: 10,
							textAlign: 'center',
							marginTop: 0,
							marginLeft: 10,
							backgroundColor: '#48BBEC',
							width: this.state.width * .85,
							color: 'white'
						}}>
							{this.props.item.name}
						</Text>
					</View>
				);
			} else {
				return (
					<View style={{
						margin: 10,
						marginTop: 10,
						backgroundColor: 'blue',
						borderColor: 'blue',
						borderRadius: 25,
						borderWidth: 5
					}}>
						<Text style={{		
							fontSize: 20,
							textAlign: 'center',
							margin: 10,
							marginTop: 0,
							backgroundColor: 'blue',
							width: this.state.width * .85,
							color: 'white',
							fontWeight: 'bold'
						}}>
							{this.props.item.message}
						</Text>
						<Text style={{		
							fontSize: 10,
							textAlign: 'center',
							marginTop: -5,
							marginLeft: 10,
							backgroundColor: 'blue',
							width: this.state.width * .85,
							color: 'white'
						}}>
							{this.props.item.date}
						</Text>					
						<Text style={{		
							fontSize: 10,
							textAlign: 'center',
							marginTop: 0,
							marginLeft: 10,
							backgroundColor: 'blue',
							width: this.state.width * .85,
							color: 'white'
						}}>
							{this.props.item.name}
						</Text>
					</View>
				);				
			}
		} else {
			return null;
		}
    }
}

export default ListItem;