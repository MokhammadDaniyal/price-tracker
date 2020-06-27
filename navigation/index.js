import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../Screens/Login';
import HomeScreen from '../Screens/Home';
import SettingsScreen from '../Screens/Settings';

const TabNavigator = createBottomTabNavigator();
const TabStack = () => (
  <TabNavigator.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: '#c2c8c5',
      },
    }}>
    <TabNavigator.Screen name="Home" component={HomeScreen} />
    <TabNavigator.Screen name="Profile" component={SettingsScreen} />
    <TabNavigator.Screen name="Settings" component={SettingsScreen} />
  </TabNavigator.Navigator>
);

const Auth = createStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false,
    }}
    headerMode="none">
    <Auth.Screen name="Login" component={LoginScreen} />
    {/* <Auth.Screen name="Signup" component={SignupScreen} /> */}
  </Auth.Navigator>
);
const RootStack = createStackNavigator();

const RootNavigator = props => {
  const {loading, hasToken} = props;
  if (loading) {
    return <WelcomeScreen />;
  } else {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          {!hasToken ? (
            <RootStack.Screen name="Auth" component={AuthStack} />
          ) : (
            <RootStack.Screen name="App" component={TabStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigator;