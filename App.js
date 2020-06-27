/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './navigation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      hasToken: true,
    };
  }
  render() {
    return (
      <>
        <RootNavigator
          hasToken={this.state.hasToken}
          loading={this.state.loading}
        />
      </>
    );
  }
}
export default App;
