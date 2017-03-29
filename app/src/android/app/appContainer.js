'use strict';

import React, {Component} from 'react';
import {
	Navigator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Socket from '../socket/socket';

class AppContainer extends Component {
	constructor(props) {
		super(props);				
	}
	
	onLogOut() {
        this.props.onLogOut();
    }
				//<UsersTab tabLabel="Users" />
				//<AuditTab tabLabel="Audit" />
	render() {
		return (
			<ScrollableTabView 
				renderTabBar={() => <DefaultTabBar backgroundColor='white' />}
			>
				<SocketTab tabLabel="Socket" />

				<Logout onLogOut={this.onLogOut.bind(this)} tabLabel="Logout" />
			</ScrollableTabView>
		);
	}
}

class SocketTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Socket', index: 0},
			{title: 'Users Details', index: 1},
			{title: 'Add User', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Socket routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <UserDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <UserAdd data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class Logout extends Component {
	constructor(props) {
		super(props);
		
		this.props.onLogOut();
	}
	
	render() {
		return null;
	}	
}

class UsersTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Users', index: 0},
			{title: 'Users Details', index: 1},
			{title: 'Add User', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Users routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <UserDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <UserAdd data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class AuditTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Audit', index: 0},
			{title: 'Audit Details', index: 1},
			{title: 'Add Audit', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Audit routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <AuditDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}			
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

export default AppContainer;