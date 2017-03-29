'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';

class Audit extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        };
    }
	
	componentDidMount() {
		this.getItems();
	}

    getItems() {
        fetch(appConfig.url + 'api/audit/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.slice(0, 25)),                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    showDetails(rowData) {
		this.props.navigator.push({
			index: 1,
			data: rowData
		});
    }
	
    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.row}>
                    <Text style={styles.rowText}>
                        {rowData.name} - {rowData.date}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress == true) {
            return;
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var recordsCount = this.state.recordsCount;
        var positionY = this.state.positionY;
        var items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource == undefined) {
            return;
        }

        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
	refreshDataAndroid() {
		this.setState({
			showProgress: true,
			resultsCount: 0
		});

		this.getItems();
	}
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
				Something went wrong.
			</Text>;
        }

        if (this.state.showProgress) {
			loader = <View style={styles.loader}>
				<ActivityIndicator
					size="large"
					animating={true}
				/>
			</View>;
        }

        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								Reload
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
							onPress={()=> this.goBack()}
						>
							<Text style={styles.textLarge}>
								Audit
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
                <View>
                    <TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
						onChangeText={this.onChangeText.bind(this)}
						style={styles.textInput}
						value={this.state.searchQuery}
						placeholder="Search here">
                    </TextInput>    			
				</View>
				
				{errorCtrl}

                {loader}	
				
				<ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>
				
				<View>
					<Text style={styles.countFooter}>
						Records: {this.state.resultsCount} 
					</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		backgroundColor: 'white'
	},		
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#48BBEC',
		borderWidth: 0,
		borderColor: 'whitesmoke'
	},	
	textSmall: {
		fontSize: 16,
		textAlign: 'center',
		margin: 14,
		fontWeight: 'bold',
		color: 'white'
	},		
	textLarge: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		marginRight: 60,
		fontWeight: 'bold',
		color: 'white'
	},		
	textInput: {
		height: 45,
		marginTop: 0,
		padding: 5,
		backgroundColor: 'white',
		borderWidth: 3,
		borderColor: 'lightgray',
		borderRadius: 0
	},		
	row: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},		
	rowText: {
		backgroundColor: '#fff', 
		color: 'black', 
		fontWeight: 'bold'
	},	
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
		color: 'white',
		fontWeight: 'bold'
    },
    loader: {
		justifyContent: 'center',
		height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Audit;