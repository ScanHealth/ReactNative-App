import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Splash';
import HomeScreen from '../Home';
import ScannerTab from './Tabs/ScannerTabs';
import TestSlider from '../TestSlider';
import Alimentation from '../Alimentation';
import Recherche from '../Recherche';
import LoginRegister from '../LoginRegister';
import React, {Component, useContext} from 'react';
import { Button, Center, NativeBaseProvider } from "native-base";
import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo} = useContext(AuthContext);

    return (
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{
                headerShown: false,
                tabBarOptions: {
                    showLabel: false
                  }
            }}>
            {userInfo.token ? (
                <>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="ScannerTab" component={ScannerTab}/>
                <Stack.Screen name="Alimentation" component={Alimentation}/>
                <Stack.Screen name="Recherche" component={Recherche}/>
                </>
             ) : (
                <>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                </>
             )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;