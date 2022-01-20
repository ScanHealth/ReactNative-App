import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScannerScreen from '../../Scanner';
import SettingsScreen from '../../Settings';
import {AuthContext} from './context/AuthContext';

const Tab = createBottomTabNavigator();

export default function ScannerTab() {
  return (
      <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}