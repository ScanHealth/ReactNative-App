import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import {AuthContext} from './context/AuthContext';
import TestSlider from './TestSlider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

export default function LoginRegister() {
      const {userInfo} = useContext(AuthContext)

      return (
        <Stack.Navigator screenOptions={{
              headerShown: false
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}