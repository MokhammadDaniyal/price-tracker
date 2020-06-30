import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
hideNavigationBar();
import LoginScreen from '../Screens/Login';
import HomeScreen from '../Screens/Home';
import SettingsScreen from '../Screens/Settings';
import SignupScreen from '../Screens/Signup';
import AuthScreen from '../Screens/Auth';

import ProductSearchScreen from '../Screens/ProductSearch';
import ProductScreen from '../Screens/Product';

getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.name;

  if (['Home', 'Profile', 'Settings'].includes(routeName)) {
    return true;
  }

  return false;
};

const Home = createStackNavigator();
const HomeStack = () => (
  <Home.Navigator>
    <Home.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Home.Screen name="ProductSearch" component={ProductSearchScreen} />
    <Home.Screen name="Product" component={ProductScreen} />
  </Home.Navigator>
);

const TabNavigator = createBottomTabNavigator();
const TabStack = () => (
  <TabNavigator.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      style: {
        backgroundColor: '#c2c8c5',
      },
    }}>
    <TabNavigator.Screen
      options={({route}) => ({
        tabBarVisible: this.getTabBarVisibility(route),
      })}
      name="Home"
      component={HomeStack}
    />
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
    <Auth.Screen name="Signup" component={SignupScreen} />
    <Auth.Screen name="Auth" component={AuthScreen} />
  </Auth.Navigator>
);
const RootStack = createStackNavigator();

const RootNavigator = (props) => {
  const {loading, hasToken} = props;
  if (loading) {
    return <WelcomeScreen />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
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
