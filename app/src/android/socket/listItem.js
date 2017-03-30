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
			return (
				<View style={{
					margin: 10,
					marginTop: 10,
					backgroundColor: 'white',
					//borderColor: '#48BBEC',
					borderColor: 'white',
					borderRadius: 25,
					borderWidth: 5
				}}>
					<Text style={{		
						fontSize: 20,
						textAlign: 'center',
						margin: 10,
						marginTop: 0,
						backgroundColor: 'white',
						width: this.state.width * .85,
						color: 'black'
					}}>
						{this.props.item.message}
					</Text>
					<Text style={{		
						fontSize: 10,
						textAlign: 'center',
						marginTop: -5,
						marginLeft: 10,
						backgroundColor: 'white',
						width: this.state.width * .85
					}}>
						{this.props.item.date}
					</Text>					
					<Text style={{		
						fontSize: 10,
						textAlign: 'center',
						marginTop: 0,
						marginLeft: 10,
						backgroundColor: 'white',
						width: this.state.width * .85
					}}>
						{this.props.item.name}
					</Text>
				</View>
			);
		} else {
			return null;
		}
    }
}

export default ListItem;