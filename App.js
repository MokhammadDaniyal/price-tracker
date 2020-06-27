/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import RootNavigator from './navigation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  render() {
    return (
      <>
        <RootNavigator
          hasToken={this.props.hasToken}
          loading={this.state.loading}
        />
      </>
    );
  }
}

mapStateToProps = state => {
  return {
    hasToken: state.user.hasToken,
  };
};

mapDispatchToProps = props => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
