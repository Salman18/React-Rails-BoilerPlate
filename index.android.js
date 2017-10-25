import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import Register from './register';

export default class ReactApi extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Register />
      </View>
    );
  }
}

const styles = {
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
};
AppRegistry.registerComponent('ReactApi', () => ReactApi);
