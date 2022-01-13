import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Login from './Login';

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Login: Login,
});

export default createAppContainer(TabNavigator);