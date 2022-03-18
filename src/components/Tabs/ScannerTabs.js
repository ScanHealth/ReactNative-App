import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScannerScreen from '../../Scanner';
import SettingsScreen from '../../Settings';
import {AuthContext} from '../../context/AuthContext';
import Alimentation from '../../Alimentation'
import Recherche from '../../Recherche'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialTopTabNavigator();

const TabTop = createMaterialTopTabNavigator();

export default function ScannerTab() {
  return (
    <>
        <Tab.Navigator initialRouteName="Scanner" tabBarPosition="bottom"  initialLayout="{ width: Dimensions.get('window').width }" screenOptions={{ tabBarIndicatorStyle: {height: 0}, tabBarStyle: { height: 65, justifyContent: 'center', backgroundColor: '#d2f2ec' }, tabBarPressColor: "#d2f2ec", tabBarShowLabel: false, headerShown: false, tabBarInactiveTintColor: '#434343', tabBarActiveTintColor: '#ff791d'}}>
          <Tab.Screen name="Nutrition" component={Alimentation} 
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="nutrition" color={color} size={24} />
                ),
            }}
          />
          <Tab.Screen name="Scanner" component={ScannerScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="barcode-scan" color={color} size={24} />
                ),
            }}
          />
          <Tab.Screen name="Recherche" component={Recherche} 
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="store-search-outline" color={color} size={24} />
                ),
            }}
          />
        </Tab.Navigator>


      </>
      
  );
}