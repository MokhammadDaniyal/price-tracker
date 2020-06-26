/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import HomeScreen from '../projectX/Screens/Home';
import SettingsScreen from '../projectX/Screens/Settings';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabNavigator = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
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
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
