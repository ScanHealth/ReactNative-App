import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScannerScreen from '../../Scanner';
import SettingsScreen from '../../Settings';
import {AuthContext} from '../../context/AuthContext';
import Alimentation from '../../Alimentation'
import Recherche from '../../Recherche'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

export default function ScannerTab() {
  return (
      <Tab.Navigator initialRouteName="Scanner" screenOptions={{tabBarShowLabel: false, headerShown: false, tabBarActiveTintColor: '#0B5a'}}>
        <Tab.Screen name="Nutrition" component={Alimentation} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="nutrition" color={color} size={size} />
              ),
          }}
        />
        <Tab.Screen name="Scanner" component={ScannerScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="barcode-scan" color={color} size={size} />
              ),
          }}
        />
        <Tab.Screen name="Recherche" component={Recherche} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="store-search-outline" color={color} size={size} />
              ),
          }}
        />
      </Tab.Navigator>
  );
}