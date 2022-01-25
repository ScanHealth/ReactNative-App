import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import {AuthContext} from './context/AuthContext';
import TestSlider from './TestSlider';
import Alimentation from './Alimentation'
import Recherche from './Recherche'


const Tab = createBottomTabNavigator();

export default function LoginRegister() {
      const {userInfo} = useContext(AuthContext)

  return (
      <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Test" component={TestSlider} />
        <Tab.Screen name="Nutrition" component={Alimentation}/>
        <Tab.Screen name="Recherche" component={Recherche}/>
      </Tab.Navigator>
  );
}